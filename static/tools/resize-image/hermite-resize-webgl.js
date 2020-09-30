/**
 * hermite-resize-webgl - The hermite-resize algorithm implemented in webgl.
 * @version 0.0.0
 * @link https://github.com/JrSchild/hermite-resize-webgl
 * @author Joram Ruitenschild
 * @license ISC
 */
function GLScale(options) {
  if (!(this instanceof GLScale)) {
    return new GLScale(options);
  }

  this.precompile(options);

  return this.scale.bind(this);
}

/**
 * Precompiling, canvas/kernel initialization
 */
GLScale.prototype.precompile = function (options) {
  this.canvas = document.createElement('canvas');

  this.canvas.width = options.width;
  this.canvas.height = options.height;

  var ctxOptions = {preserveDrawingBuffer: true};
  this.gl = this.canvas.getContext('webgl', ctxOptions) || this.canvas.getContext('experimental-webgl', ctxOptions);

  if (!this.gl) {
    throw new Error('Could not initialize webgl context');
  }

  // Setup GLSL program
  var vertex = GLScale.compileShader(this.gl, GLScale.Hermite.vertex, this.gl.VERTEX_SHADER);
  var fragment = GLScale.compileShader(this.gl, GLScale.Hermite.fragment, this.gl.FRAGMENT_SHADER);
  this.program = GLScale.createProgram(this.gl, vertex, fragment);
  this.gl.useProgram(this.program);

  // Create a texture.
  this.gl.bindTexture(this.gl.TEXTURE_2D, this.gl.createTexture());

  // Set the parameters so we can render any size image.
  // If this stuff is not supported, draw the image to a canvas with POT dimensions.
  this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
  this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
  this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST);
  this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);

  // lookup uniforms and set the resolution
  var resolutionLocation = this.gl.getUniformLocation(this.program, 'u_resolution');
  this.gl.uniform2f(resolutionLocation, this.canvas.width, this.canvas.height);

  // Create a buffer for the position of the rectangle corners.
  this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.gl.createBuffer());
  var positionLocation = this.gl.getAttribLocation(this.program, 'a_position');
  this.gl.enableVertexAttribArray(positionLocation);
  this.gl.vertexAttribPointer(positionLocation, 2, this.gl.FLOAT, false, 0, 0);
};

GLScale.prototype.scale = function (image, cb) {

  // If image is string, load it and call this method again.
  if (typeof image === 'string') {
    return this.loadImage(image, function (err, image) {
      // Don't throw anything on err, console already logs 404.
      if (!err) return this.scale(image, cb);
    });
  }

  // Upload the image into the texture.
  this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, image);

  var srcResolutionLocation = this.gl.getUniformLocation(this.program, 'u_srcResolution');
  this.gl.uniform2f(srcResolutionLocation, image.width, image.height);

  // Set a rectangle the same size as the image and draw it.
  this.setRectangle(0, 0, image.width, image.height);
  this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);

  // Not completely recommended, but can't find another way right now to know when it's finished.
  // http://codeflow.org/entries/2013/feb/22/how-to-write-portable-webgl/#performance-differences
  this.gl.finish();

  // Enhance the canvas object with toBlob polyfill, if it doesn't exist.
  this.canvas.toBlob = GLScale.toBlob;

  if (cb) cb(this.canvas);

  return this;
};

GLScale.prototype.setRectangle = function (x, y, width, height) {
  var x1 = x;
  var x2 = x + width;
  var y1 = y;
  var y2 = y + height;
  this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array([
    x1, y1,
    x2, y1,
    x1, y2,
    x1, y2,
    x2, y1,
    x2, y2
  ]), this.gl.STATIC_DRAW);
};

/**
 * Load image from url.
 * Useful to have as static- and instance method.
 */
GLScale.loadImage = function (url, cb) {
  var image = new Image();
  image.onload = cb.bind(this, null, image);
  image.onerror = cb.bind(this);
  image.src = url;

  return this;
};
GLScale.prototype.loadImage = GLScale.loadImage;

/**
 * canvas.prototype.toBlob polyfill.
 * Does not change the prototype chain.
 */
GLScale.toBlob = (function toBlob() {
  var CanvasPrototype = window.HTMLCanvasElement.prototype;

  if (CanvasPrototype.toBlob) {
    return CanvasPrototype.toBlob;
  }

  return function(callback, type, quality) {
    var binStr = atob(this.toDataURL(type, quality).split(',')[1]);
    var len = binStr.length;
    var arr = new Uint8Array(len);

    for (var i = 0; i < len; i++) {
      arr[i] = binStr.charCodeAt(i);
    }

    callback( new Blob( [arr], {type: type || 'image/png'} ) );
  };
})();

// Helper methods to compile the program.
GLScale.compileShader = function (gl, shaderSource, shaderType) {
  var shader = gl.createShader(shaderType);
 
  gl.shaderSource(shader, shaderSource);
  gl.compileShader(shader);
 
  // When unable to compile, throw error.
  if (!(gl.getShaderParameter(shader, gl.COMPILE_STATUS))) {
    throw new Error('Could not compile shader: ' + gl.getShaderInfoLog(shader));
  }
 
  return shader;
};

GLScale.createProgram = function (gl, vertexShader, fragmentShader) {
  var program = gl.createProgram();
 
  // attach the shaders.
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
 
  // link the program.
  gl.linkProgram(program);
 
  // Throw error when unable to link
  if (!(gl.getProgramParameter(program, gl.LINK_STATUS))) {
    throw ("program filed to link:" + gl.getProgramInfoLog (program));
  }
 
  return program;
};

GLScale.Hermite = {
  vertex: 'attribute vec2 a_position;uniform vec2 u_resolution;void main(){vec2 clipSpace=(a_position/u_resolution*2.)-1.;gl_Position=vec4(clipSpace*vec2(1,-1),0,1);}',
  fragment: 'precision highp float;uniform sampler2D u_image;uniform vec2 u_resolution;uniform vec2 u_srcResolution;vec4 pixelsToTexture(vec2 loc){vec2 target=loc/u_srcResolution;target.y=1.-target.y;return texture2D(u_image,target);}void main(){vec2 ratio=u_srcResolution/u_resolution;vec2 ratioHalf=ceil(ratio/2.);vec2 loc=gl_FragCoord.xy;float x2=(loc.x+loc.y*u_resolution.x)*4.;float weight=0.;float weights=0.;float weights_alpha=0.;vec3 gx_rgb=vec3(0.);float gx_a=0.;float center_y=(loc.y+.5)*ratio.y;float yy=floor(loc.y*ratio.y);float yy_length=(loc.y+1.)*ratio.y;for(int yyy=0;yyy<5000;yyy++){if(yy>=yy_length){break;}float dy=abs(center_y-(yy+.5))/ratioHalf.y;float center_x=(loc.x+.5)*ratio.x;float w0=dy*dy;float xx=floor(loc.x*ratio.x);float xx_length=(loc.x+1.)*ratio.x;for(int xxx=0;xxx<5000;xxx++){if(xx>=xx_length){break;}float dx=abs(center_x-(xx+.5))/ratioHalf.x;float w=sqrt(w0+dx*dx);if(w>=-1.&&w<=1.){weight=2.*w*w*w-3.*w*w+1.;if(weight>0.){vec4 pixel=pixelsToTexture(vec2(xx,yy))*255.;gx_a+=weight*pixel.a;weights_alpha+=weight;if(pixel.a<255.){weight=weight*pixel.a/250.;}gx_rgb+=weight*pixel.rgb;weights+=weight;}}xx++;}yy++;}gx_rgb=(gx_rgb/weights)/255.;gx_a=(gx_a/weights_alpha)/255.;gl_FragColor=vec4(gx_rgb,gx_a);}'
};
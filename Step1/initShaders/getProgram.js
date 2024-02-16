function getProgram(gl,vShader,fShader) {

    var shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram,vShader);
    gl.attachShader(shaderProgram,fShader);
    gl.linkProgram(shaderProgram);
    gl.useProgram(shaderProgram);

    return shaderProgram;
}
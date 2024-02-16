function createDomShaderProgram(gl) {

    var vShader = getShader(gl, 'vs', VSHADER_SOURCE);
    var fShader = getShader(gl, 'fs', FSHADER_SOURCE);

    var shaderProgram = getProgram(gl,vShader,fShader);

    return shaderProgram;
}
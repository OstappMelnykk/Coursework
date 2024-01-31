class SuperCube {
    #InitialCube
    #Cubes;
    constructor(_InitialCube = new Cube()) {
        this.#InitialCube = _InitialCube
    }

    Devide(num_X, num_Y, num_Z){

        let cubes = []

        for (let XcubeI of this.#InitialCube.DevideBy_X_axis(num_X)) {
            for (let YcubeI of (new Cube(XcubeI)).DevideBy_Y_axis(num_Y)) {
                for (let ZcubeI of (new Cube(YcubeI)).DevideBy_Z_axis(num_Z)) {
                    cubes.push(new Cube(ZcubeI))
                }
            }
        }

        this.#Cubes = [...cubes]

        let vertexes = this.getAllPointsOfAllCubesAs_xyz()

        let vertexes_With_MiddleVertexes = [...vertexes]
        for (let cube of this.#Cubes) vertexes_With_MiddleVertexes.push(...cube.getMiddlePointsAs_xyz())

        let indexes = this.getConnectionInnerIndexesForEveryCube();

        return [
            [...vertexes_With_MiddleVertexes],
            [...vertexes],
            [...indexes],
        ];
    };

    getAllPointsOfAllCubesAs_xyz(){

        let result = [];
        for (let i = 0; i < this.#Cubes.length; i++) {
            result.push(...this.#Cubes[i].getPointsAs_xyz());
        }

        return result;
    }

    getConnectionInnerIndexesForEveryCube() {
        const indices = [
            0, 1, 1, 2, 2, 3, 3, 0, 0, 4, 1, 5,
            2, 6, 3, 7, 4, 5, 5, 6, 6, 7, 7, 4,
        ];

        let newIndexes = [];

        for (let i = 0; i < this.#Cubes.length; i++) {
            const plusVal = 8 * i;
            const currentIndices = indices.map(index => index + plusVal);
            newIndexes.push(...currentIndices);
        }

        return newIndexes;
    }


    get InitialCube() {
        return this.#InitialCube
    }
    set InitialCube(_InitialCube) {
        this.#InitialCube = _InitialCube
    }

    get Cubes() {
        return this.#Cubes
    }
    set Cubes(_Cubes) {
        this.#Cubes = _Cubes
    }

    print() {
        console.log("SuperCube:");
        let i = 1;
        for (const cube of this.#Cubes) {
            console.log(i)
            cube.print();
            console.log("\n\n")
            i++;
        }
    }
}

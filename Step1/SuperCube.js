class SuperCube {
    #Cubes;
    constructor(_Cubes = [new Cube()]) {
        this.#Cubes = _Cubes;
    }

    GetAllVertexes_AsArray(){

        let result = [];
        for (let i = 0; i < this.#Cubes.length; i++) {
            result.push(...this.#Cubes[i].GetCubesVerteces_AsArray());
        }
        return result;
    }

    GetAllIndexes(){
        let AllIndexes = []

        let indices = [
            0, 1, 1, 2, 2, 3, 3, 0,
            0, 4,
            1, 5,
            2, 6,
            3, 7,
            4, 5, 5, 6, 6, 7, 7, 4,
        ]

        let newIndexes = []

        for (let i = 0; i < this.#Cubes.length; i++){

            let New_indices = []
            let PlusVal = 8 * i
            for (let j = 0; j < indices.length; j ++){
                New_indices[j] = indices[j] + PlusVal;
            }

            newIndexes = [...newIndexes, ...New_indices]



        }

        return newIndexes

    }



    Super_DevideBy_X_axis(number, indexOfCube = 0){

        for (let i of this.#Cubes[0].DevideBy_X_axis(4))
        {
            for (let j of i){
                console.log(j)
            }
        }



        // this.#Cubes[0].DevideBy_X_axis(3)
        //
        // for (let i of this.#Cubes[indexOfCube].DevideBy_X_axis(number)){
        //     this.#Cubes.push(new Cube(i))
        // }
        // this.#Cubes.splice(indexOfCube, 1);
    }
    Super_DevideBy_Y_axis(number, indexOfCube = 0){
        for (let i of this.#Cubes[indexOfCube].DevideBy_Y_axis(number)){
            this.#Cubes.push(new Cube(i))
        }
        this.#Cubes.splice(indexOfCube, 1);
    }
    Super_DevideBy_Z_axis(number, indexOfCube = 0){
        for (let i of this.#Cubes[indexOfCube].DevideBy_Z_axis(number)){
            this.#Cubes.push(new Cube(i))
        }
        this.#Cubes.splice(indexOfCube, 1);
    }





    print() {
        console.log("SuperCube:");
        for (const cube of this.#Cubes) {
            cube.print();
        }
    }




}

class SuperCube {
    #Cubes;
    constructor(_Cubes = [new Cube()]) {
        this.#Cubes = _Cubes;
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

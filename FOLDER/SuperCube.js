class SuperCube {
    #InitialCube
    #Cubes = [];


    #PointsToDraw = []
    #MiddlePointsToDraw = []
    #AllPointsToDraw = []
    #IndicesToDraw = []



    #AllPointsOfAllCubes = []
    #All__UNIQUE__PointsOfAllCubes = []
    AKT = []
    NT = []

    constructor(_InitialCube = new Cube()) {
        this.#InitialCube = _InitialCube
    }

    Devide(num_X, num_Y, num_Z){
        let IdCounter = 1
        for (let YCube of this.#InitialCube.DevideBy_Y_axis(num_Y)){
            for (let ZCube of YCube.DevideBy_Z_axis(num_Z)){
                for (let XCube of ZCube.DevideBy_X_axis(num_X)){
                    XCube.Id = IdCounter
                    this.#Cubes.push(XCube)
                    IdCounter++
                }
            }
        }

        this.setGlobalIDs()
        return this.drawingTool()
    }


    cretae_AKT_array(){
        for (let i of this.#All__UNIQUE__PointsOfAllCubes)
            this.AKT.push([i.X, i.Y, i.Z])

        return this.AKT
    }

    cretae_NT_array(){
        for (let _cube of this.#Cubes){
            let temp_arr = []

            for(let point of _cube.getCubes_AllPoints_SortedinUsualWay()){
                temp_arr.push(point.GlobalID)
            }

            this.NT.push(temp_arr)

        }

        return this.NT
    }
    getAllDataFromSuperCube(){
        return [
            [...this.#Cubes],
            [...this.#AllPointsOfAllCubes],
            [...this.#All__UNIQUE__PointsOfAllCubes]
        ]
    }
    setGlobalIDs(){

        for (let i of this.#Cubes)
            this.#AllPointsOfAllCubes.push(...i.getCubes_AllPoints_SortedBtGeneral())

        this.#AllPointsOfAllCubes.sort(this.sortForGeneralNumeration);

        this.#AllPointsOfAllCubes[0].GlobalID = 1

        this.#All__UNIQUE__PointsOfAllCubes
            .push(this.#AllPointsOfAllCubes[0]
                .copy(
                    this.#AllPointsOfAllCubes[0].LocalID,
                    this.#AllPointsOfAllCubes[0].GlobalID
                )
            )


        let counter = 2
        for (let i = 1; i < this.#AllPointsOfAllCubes.length; i++)
        {
            if (this.#AllPointsOfAllCubes[i].X === this.#AllPointsOfAllCubes[i - 1].X &&
                this.#AllPointsOfAllCubes[i].Y === this.#AllPointsOfAllCubes[i - 1].Y &&
                this.#AllPointsOfAllCubes[i].Z === this.#AllPointsOfAllCubes[i - 1].Z)
            {
                this.#AllPointsOfAllCubes[i].GlobalID = this.#AllPointsOfAllCubes[i - 1].GlobalID
            }
            else{
                this.#AllPointsOfAllCubes[i].GlobalID = counter

                this.#All__UNIQUE__PointsOfAllCubes
                    .push(this.#AllPointsOfAllCubes[i]
                        .copy(
                            this.#AllPointsOfAllCubes[i].LocalID,
                            this.#AllPointsOfAllCubes[i].GlobalID
                        )
                    )
                counter++
            }
        }
    }


    get All__UNIQUE__PointsOfAllCubes(){
        return this.#All__UNIQUE__PointsOfAllCubes
    }

    sortForGeneralNumeration(point1, point2) {
        if (point1.Y !== point2.Y) {
            return point1.Y - point2.Y;
        }
        if (point1.Z !== point2.Z) {
            return point1.Z - point2.Z;
        }
        return point1.X - point2.X;
    }



    drawingTool(){

        for (let i of this.#Cubes){
            let tuple = i.drawingTool()
            this.#PointsToDraw.push(...tuple[0])
            this.#MiddlePointsToDraw.push(...tuple[1])
            this.#IndicesToDraw.push(...tuple[3])
        }

        this.#AllPointsToDraw = [...this.#PointsToDraw, ...this.#MiddlePointsToDraw]

        return [
            this.#PointsToDraw,
            this.#MiddlePointsToDraw,
            this.#AllPointsToDraw,
            this.#IndicesToDraw,
        ]
    }


    print(){
        for (let i of this.#Cubes){
            i.print()
        }
    }
}
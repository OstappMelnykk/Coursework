class SuperCube {
    #InitialCube
    #Cubes = [];

    #PointsAcrossAllCubes_ToDraw = []
    #MiddlePointsAcrossAllCubes_ToDraw = []
    #All_PointsAcrossAllCubes_ToDraw = []

    #IndicesAcrossAllCubes_ToDraw = []




    #All_PointsAcrossAllCubes = []
    #AllUnique_PointsAcrossAllCubes = []


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

        this.Func()
        return this.DrawingTool()
    }

    Func(){
        //1) Set Global IDs
        //2) Create array All_PointsAcrossAllCubes
        //2) Create array AllUnique_PointsAcrossAllCubes

        for (let i of this.#Cubes)
            this.#All_PointsAcrossAllCubes.push(...i.GetAllCubePointsWith_Global_Numeration_Sorting())

        this.#All_PointsAcrossAllCubes.sort(this.Global_Numeration_Sorting);


        this.#All_PointsAcrossAllCubes[0].GlobalID = 1

        this.#AllUnique_PointsAcrossAllCubes
            .push(this.#All_PointsAcrossAllCubes[0]
                .copy(
                    this.#All_PointsAcrossAllCubes[0].LocalID,
                    this.#All_PointsAcrossAllCubes[0].GlobalID,
                )
            )

        let counter = 2

        for (let i = 1; i < this.#All_PointsAcrossAllCubes.length; i++){
            if (this.#All_PointsAcrossAllCubes[i].X === this.#All_PointsAcrossAllCubes[i - 1].X &&
                this.#All_PointsAcrossAllCubes[i].Y === this.#All_PointsAcrossAllCubes[i - 1].Y &&
                this.#All_PointsAcrossAllCubes[i].Z === this.#All_PointsAcrossAllCubes[i - 1].Z)
            {
                this.#All_PointsAcrossAllCubes[i].GlobalID = this.#All_PointsAcrossAllCubes[i - 1].GlobalID
            }
            else {
                this.#All_PointsAcrossAllCubes[i].GlobalID = counter

                this.#AllUnique_PointsAcrossAllCubes
                    .push(this.#All_PointsAcrossAllCubes[i]
                        .copy(
                            this.#All_PointsAcrossAllCubes[i].LocalID,
                            this.#All_PointsAcrossAllCubes[i].GlobalID
                        )
                    )

                counter++
            }
        }
    }



    cretae_AKT_array(){
        for (let point of this.#AllUnique_PointsAcrossAllCubes)
            this.AKT.push([point.X, point.Y, point.Z])

        return this.AKT
    }

    cretae_NT_array(){
        for (let cube of this.#Cubes){
            let globalIndicesArray = []

            for(let point of cube.GetAllCubePointsWith_Local_Numeration_Sorting())
                globalIndicesArray.push(point.GlobalID)

            this.NT.push(globalIndicesArray)
        }

        return this.NT
    }



    Get_AKT(){
        return  [...this.AKT]
    }
    Get_NT(){
        return  [...this.NT]
    }

    Global_Numeration_Sorting(point1, point2) {
        if (point1.Y !== point2.Y) {
            return point1.Y - point2.Y;
        }
        if (point1.Z !== point2.Z) {
            return point1.Z - point2.Z;
        }
        return point1.X - point2.X;
    }

    Local_Numeration_Sorting(point1, point2) {
        return point1.LocalID - point2.LocalID;
    }



    DrawingTool(){

        for (let i of this.#Cubes){
            let tuple = i.DrawingTool()
            this.#PointsAcrossAllCubes_ToDraw.push(...tuple[0])
            this.#MiddlePointsAcrossAllCubes_ToDraw.push(...tuple[1])
            this.#IndicesAcrossAllCubes_ToDraw.push(...tuple[3])
        }

        this.#All_PointsAcrossAllCubes_ToDraw = [...this.#PointsAcrossAllCubes_ToDraw, ...this.#MiddlePointsAcrossAllCubes_ToDraw]

        return [
            this.#PointsAcrossAllCubes_ToDraw,
            this.#MiddlePointsAcrossAllCubes_ToDraw,
            this.#All_PointsAcrossAllCubes_ToDraw,
            this.#IndicesAcrossAllCubes_ToDraw,
        ]
    }




    print(){
        for (let i of this.#Cubes){
            i.print()
        }
    }
}
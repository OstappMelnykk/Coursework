class SuperCube {
    #InitialCube = new Cube()
    #Cubes = [];
    #Points = []
    #UniquePoints = []

    #PointsToDraw = []
    #IndicesToDraw = []

    AKT = []
    NT = []

    constructor() {

    }


    Devide(num_X, num_Y, num_Z) {

        //set:
            //  Cubes = [];
            //  Points = []


            //  PointsToDraw = []
            //  IndicesToDraw = []
        this.DevideTool(num_X, num_Y, num_Z)

        //set:
            //  UniquePoints = []
        this.SetUniquePoints()

        return this.DrawingTool()
    }


    DevideTool(num_X, num_Y, num_Z){

        this.#Cubes = [];
        this.#Points = []
        this.#UniquePoints = []

        this.#PointsToDraw = []
        this.#IndicesToDraw = []

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

        /* for (let i of this.#Cubes){
             console.log(i.CenterPoint)
         }
         this.#Cubes.sort(this.Cube_CenterPoint_Sorting)
         for (let i of this.#Cubes){
             console.log(i.CenterPoint)
         }*/

        for (let _cube of this.#Cubes){
            this.#Points.push(..._cube.Points)
            this.#PointsToDraw.push(..._cube.GetPointsToDraw())
            this.#IndicesToDraw.push(..._cube.IndicesToDraw)
        }

        this.#Points.sort(this.Global_Numeration_Sorting)


        //this.Func()

    }


    SetUniquePoints(){

        this.#Points[0].GlobalID = 1
        this.#UniquePoints
            .push(this.#Points[0]
                .copy(
                    this.#Points[0].LocalID,
                    this.#Points[0].GlobalID,
                )
            )

        let counter = 2

        for (let i = 1; i < this.#Points.length; i++){
            if (this.#Points[i].X === this.#Points[i - 1].X &&
                this.#Points[i].Y === this.#Points[i - 1].Y &&
                this.#Points[i].Z === this.#Points[i - 1].Z)
            {
                this.#Points[i].GlobalID = this.#Points[i - 1].GlobalID
            }
            else {
                this.#Points[i].GlobalID = counter

                this.#UniquePoints
                    .push(this.#Points[i]
                        .copy(
                            this.#Points[i].LocalID,
                            this.#Points[i].GlobalID
                        )
                    )
                counter++
            }
        }
    }

    cretae_AKT_array(){
        this.AKT = []
        for (let point of this.#UniquePoints)
            this.AKT.push([point.X, point.Y, point.Z])

        return this.AKT
    }
    cretae_NT_array(){
        this.NT = []
        for (let cube of this.#Cubes) {
            let arr = []
            let cubepoints = [...cube.Points].sort(this.Local_Numeration_Sorting)
            for (let _point of cubepoints){
                arr.push(_point.GlobalID)
            }

            this.NT.push(arr)

        }
        return this.NT

    }

    Cube_CenterPoint_Sorting(cube1, cube2){
        if (cube1.CenterPoint.Y !== cube2.CenterPoint.Y)
            return cube1.CenterPoint.Y - cube2.CenterPoint.Y;
        if (cube1.CenterPoint.Z !== cube2.CenterPoint.Z)
            return cube1.CenterPoint.Z - cube2.CenterPoint.Z;

        return cube1.CenterPoint.X - cube2.CenterPoint.X;
    }
    Global_Numeration_Sorting(point1, point2) {
        if (point1.Y !== point2.Y)
            return point1.Y - point2.Y;
        if (point1.Z !== point2.Z)
            return point1.Z - point2.Z;

        return point1.X - point2.X;
    }

    Local_Numeration_Sorting(point1, point2) {return point1.LocalID - point2.LocalID;}

    DrawingTool(){
        return [
            this.#PointsToDraw,
            this.#IndicesToDraw
        ]
    }
}
class Cube {
    #Id
    #Points = []
    #MiddlePoints = []

    #StaticCnnectionIndices = [
        [0, 1, 2, 3, 4, 5, 6, 7],  //X
        [0, 4, 1, 5, 2, 6, 3, 7],  //Y
        [0, 2, 1, 3, 4, 6, 5, 7],  //Z
    ]

    #DynamicCnnectionIndices = [
        [0, 1, 2, 3, 4, 5, 6, 7],  //X
        [0, 4, 1, 5, 2, 6, 3, 7],  //Y
        [0, 2, 1, 3, 4, 6, 5, 7],  //Z
    ]

    #MinX
    #MinY
    #MinZ

    #MaxX
    #MaxY
    #MaxZ

    #centerPoint

    constructor(_Id = 1, _Points = [
        new Point(-1, -1, -1, -1, -1),
        new Point(-1, -1, 1, -1, -1),
        new Point(-1, -1, -1, -1, 1),
        new Point(-1, -1, 1, -1, 1),

        new Point(-1, -1, -1, 1, -1),
        new Point(-1, -1, 1, 1, -1),
        new Point(-1, -1, -1, 1, 1),
        new Point(-1, -1, 1, 1, 1),
    ])
    {

        this.#Id = (_Id <= 0) ? 1 : _Id
        this.#DynamicCnnectionIndices = this.#DynamicCnnectionIndices.map(row => row.map(element => element + 8 * (this.#Id - 1)))

        if (_Points.length === 8){
            this.#Points = _Points
        }
        else{
            this.#Points = [

                new Point(-1, -1, -1, -1, -1),
                new Point(-1, -1, 1, -1, -1),
                new Point(-1, -1, -1, -1, 1),
                new Point(-1, -1, 1, -1, 1),

                new Point(-1, -1, -1, 1, -1),
                new Point(-1, -1, 1, 1, -1),
                new Point(-1, -1, -1, 1, 1),
                new Point(-1, -1, 1, 1, 1),
            ]
        }



        this.#Points.sort(this.Global_Numeration_Sorting);
        this.CalculateMiddlePoints()
        this.#MiddlePoints.sort(this.Global_Numeration_Sorting)
        this.Calculate_Min_Max()
        this.setLocalIDs()

    }


    CalculateMiddlePoints(){
        for (let j = 0; j < this.#StaticCnnectionIndices.length; j++){
            for (let i = 0; i < this.#StaticCnnectionIndices[0].length; i += 2) {
                let idx1 = this.#StaticCnnectionIndices[j][i]
                let idx2 = this.#StaticCnnectionIndices[j][i + 1]

                const point1 = this.#Points[idx1];
                const point2 = this.#Points[idx2];

                let midX = (point1.X + point2.X) / 2
                let midY = (point1.Y + point2.Y) / 2
                let midZ = (point1.Z + point2.Z) / 2

                this.#MiddlePoints.push(new Point(-1, -1, midX, midY, midZ))


                this.#centerPoint = new Point(-1, -1,
                    (this.#MinX + this.#MaxX) / 2,
                    (this.#MinY + this.#MaxY) / 2,
                    (this.#MinZ + this.#MaxZ) / 2,)
            }
        }
    }

    GetCubePointsWith_Global_Numeration_Sorting(){
        return this.#Points
    }
    GetCubeMiddlePointsWith_Global_Numeration_Sorting(){
        return this.#MiddlePoints
    }

    GetAllCubePointsWith_Global_Numeration_Sorting(){
        return [
            ...this.GetCubePointsWith_Global_Numeration_Sorting(),
            ...this.GetCubeMiddlePointsWith_Global_Numeration_Sorting()
        ].sort(this.Global_Numeration_Sorting)
    }


    GetCubePointsWith_Local_Numeration_Sorting(){
        return this.#Points.sort(this.Local_Numeration_Sorting)
    }
    GetCubeMiddlePointsWith_Local_Numeration_Sorting(){
        return this.#MiddlePoints.sort(this.Local_Numeration_Sorting)
    }

    GetAllCubePointsWith_Local_Numeration_Sorting(){
        return [
            ...this.GetCubePointsWith_Local_Numeration_Sorting(),
            ...this.GetCubeMiddlePointsWith_Local_Numeration_Sorting()
        ].sort(this.Local_Numeration_Sorting)
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


    Calculate_Min_Max() {
        this.#MinX = this.#Points[0].X;
        this.#MinY = this.#Points[0].Y;
        this.#MinZ = this.#Points[0].Z;

        this.#MaxX = this.#Points[7].X;
        this.#MaxY = this.#Points[7].Y;
        this.#MaxZ = this.#Points[7].Z;
    }

    setLocalIDs(){
        this.#Points[0].LocalID = 1
        this.#Points[1].LocalID = 2
        this.#Points[2].LocalID = 4
        this.#Points[3].LocalID = 3
        this.#Points[4].LocalID = 5
        this.#Points[5].LocalID = 6
        this.#Points[6].LocalID = 8
        this.#Points[7].LocalID = 7

        this.#MiddlePoints[0].LocalID = 9
        this.#MiddlePoints[1].LocalID = 12
        this.#MiddlePoints[2].LocalID = 10
        this.#MiddlePoints[3].LocalID = 11
        this.#MiddlePoints[4].LocalID = 13
        this.#MiddlePoints[5].LocalID = 14
        this.#MiddlePoints[6].LocalID = 16
        this.#MiddlePoints[7].LocalID = 15
        this.#MiddlePoints[8].LocalID = 17
        this.#MiddlePoints[9].LocalID = 20
        this.#MiddlePoints[10].LocalID = 18
        this.#MiddlePoints[11].LocalID = 19
    }




    CalcNewPoints(coordinate1, coordinate2, num) {
        if (num === 0)
            return []

        let newPointsArray = [];
        let numSegments = num;

        numSegments = num - 1;

        for (let i = 1; i <= numSegments; i++) {
            let ti = i / (numSegments + 1);

            let xi = (1 - ti) * coordinate1  +  ti * coordinate2;
            // newPointsArray.push(xi);
            newPointsArray.push(parseFloat(xi.toFixed(5)));
        }
        return newPointsArray;
    }


    DevideBy_X_axis(number){
        let new_X_Points = [this.#MinX, ... this.CalcNewPoints(this.#MinX, this.#MaxX, number), this.#MaxX]

        let Squares = []
        let cubes = []

        for (let i = 0; i < number + 1; i++){
            Squares.push([
                new Point(-1, -1, new_X_Points[i], this.#MinY, this.#MinZ),
                new Point(-1, -1, new_X_Points[i], this.#MinY, this.#MaxZ),
                new Point(-1, -1, new_X_Points[i], this.#MaxY, this.#MinZ),
                new Point(-1, -1, new_X_Points[i], this.#MaxY, this.#MaxZ),

            ])
        }

        for (let i = 0; i < number; i++){
            cubes.push(new Cube(-1,[
                Squares[i][0].copy(),
                Squares[i + 1][0].copy(),
                Squares[i][1].copy(),
                Squares[i + 1][1].copy(),

                Squares[i][2].copy(),
                Squares[i + 1][2].copy(),
                Squares[i][3].copy(),
                Squares[i + 1][3].copy(),
            ]))
        }
        return cubes
    }


    DevideBy_Y_axis(number){
        let new_Y_Points = [this.#MinY, ... this.CalcNewPoints(this.#MinY, this.#MaxY, number), this.#MaxY]

        let Squares = []
        let cubes = []

        for (let i = 0; i < number + 1; i++){
            Squares.push([
                new Point(-1, -1, this.#MinX, new_Y_Points[i], this.#MinZ),
                new Point(-1, -1, this.#MaxX, new_Y_Points[i], this.#MinZ),
                new Point(-1, -1, this.#MinX, new_Y_Points[i], this.#MaxZ),
                new Point(-1, -1, this.#MaxX, new_Y_Points[i], this.#MaxZ),

            ])
        }

        for (let i = 0; i < number; i++){

            cubes.push(new Cube(-1,[
                Squares[i][0].copy(),
                Squares[i][1].copy(),
                Squares[i][2].copy(),
                Squares[i][3].copy(),


                Squares[i + 1][0].copy(),
                Squares[i + 1][1].copy(),
                Squares[i + 1][2].copy(),
                Squares[i + 1][3].copy(),
            ]))
        }
        return cubes
    }
    DevideBy_Z_axis(number){

        let new_Z_Points = [this.#MinZ, ... this.CalcNewPoints(this.#MinZ, this.#MaxZ, number), this.#MaxZ]

        let Squares = []
        let cubes = []

        for (let i = 0; i < number + 1; i++){
            Squares.push([
                new Point(-1, -1, this.#MinX, this.#MinY, new_Z_Points[i]),
                new Point(-1, -1, this.#MaxX, this.#MinY, new_Z_Points[i]),
                new Point(-1, -1, this.#MinX, this.#MaxY, new_Z_Points[i]),
                new Point(-1, -1, this.#MaxX, this.#MaxY, new_Z_Points[i]),

            ])
        }

        for (let i = 0; i < number; i++){

            cubes.push(new Cube(-1,[
                Squares[i][0].copy(),
                Squares[i][1].copy(),
                Squares[i + 1][0].copy(),
                Squares[i + 1][1].copy(),


                Squares[i][2].copy(),
                Squares[i][3].copy(),
                Squares[i + 1][2].copy(),
                Squares[i + 1][3].copy(),
            ]))
        }
        return cubes
    }


    GetPointsToDraw(){
        let CubePointsForDrawing = []

        for (let point of this.#Points) {
            CubePointsForDrawing.push(point.X)
            CubePointsForDrawing.push(point.Y)
            CubePointsForDrawing.push(point.Z)
        }

        return CubePointsForDrawing
    }


    GetMiddlePointsToDraw(){
        let CubeMiddlePointsForDrawing = []

        for (let point of this.#MiddlePoints) {
            CubeMiddlePointsForDrawing.push(point.X)
            CubeMiddlePointsForDrawing.push(point.Y)
            CubeMiddlePointsForDrawing.push(point.Z)
        }
        return CubeMiddlePointsForDrawing
    }

    GetIndicesToDraw(){
        let IndicesToDraw = []
        for (let i = 0; i < this.#DynamicCnnectionIndices.length; i++)
            IndicesToDraw.push(...this.#DynamicCnnectionIndices[i])
        return IndicesToDraw
    }


    DrawingTool(){
        return [
            this.GetPointsToDraw(),
            this.GetMiddlePointsToDraw(),
            [...this.GetPointsToDraw(), ...this.GetMiddlePointsToDraw()],
            this.GetIndicesToDraw(),
        ]
    }

    ChangeCnnectionIndices(i = this.#Id - 1){
        this.#DynamicCnnectionIndices = this.#DynamicCnnectionIndices.map(row => row.map(element => element + 8 * i));
    }

    get CnnectionIndices(){
        return this.#DynamicCnnectionIndices
    }

    get Id(){
        return this.#Id
    }
    set Id(_Id){
        this.#Id = _Id
        this.ChangeCnnectionIndices()
    }



    get centerPoint(){
        return this.#centerPoint
    }

    get MinX(){
        return this.#MinX
    }
    get MinY(){
        return this.#MinY
    }
    get MinZ(){
        return this.#MinZ
    }


    get MaxX(){
        return this.#MaxX
    }
    get MaxY(){
        return this.#MaxY
    }
    get MaxZ(){
        return this.#MaxZ
    }

    print(){
        console.log(`Cube ${this.#Id}:`);
        console.log(this.GetAllCubePointsWith_Global_Numeration_Sorting())
    }
}
class Object {
    #Points = []
    #InvisibleCube
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
    constructor(_Id = 1, _Points = [
        new Point(-1, -1, -1.5, -1.5, -1),
        new Point(-1, -1, 1, -1, -1),
        new Point(-1, -1, -1, -1, 1.5),
        new Point(-1, -1, 1, -1, 1),

        new Point(-1, -1.5, -1, 1, -1),
        new Point(-1, -1, 1, 1.4, -1),
        new Point(-1, -1, -1, 1, 1),
        new Point(-1, -1, 1.5, 1, 1),
    ])
    {
        /*if (_Points.length === 8){

        }*/
        this.#Points = _Points
        //this.#Points.sort(this.Global_Numeration_Sorting);
        this.CalculateMiddlePoints()
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


/*                this.#centerPoint = new Point(-1, -1,
                    (this.#MinX + this.#MaxX) / 2,
                    (this.#MinY + this.#MaxY) / 2,
                    (this.#MinZ + this.#MaxZ) / 2,)*/
            }
        }
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



    GetObjectPointsToDraw(){
        let CubePointsForDrawing = []

        for (let point of this.#Points) {
            CubePointsForDrawing.push(point.X)
            CubePointsForDrawing.push(point.Y)
            CubePointsForDrawing.push(point.Z)
        }

        return CubePointsForDrawing
    }
    GetbjectMiddlePointsToDraw(){
        let CubeMiddlePointsForDrawing = []

        for (let point of this.#MiddlePoints) {
            CubeMiddlePointsForDrawing.push(point.X)
            CubeMiddlePointsForDrawing.push(point.Y)
            CubeMiddlePointsForDrawing.push(point.Z)
        }
        return CubeMiddlePointsForDrawing
    }

    GetObjectIndicesToDraw(){
        let IndicesToDraw = []
        for (let i = 0; i < this.#DynamicCnnectionIndices.length; i++)
            IndicesToDraw.push(...this.#DynamicCnnectionIndices[i])
        return IndicesToDraw
    }

    ObjectDrawingTool(){
        return [
            this.GetObjectPointsToDraw(),
            this.GetbjectMiddlePointsToDraw(),
            [...this.GetObjectPointsToDraw(), ...this.GetbjectMiddlePointsToDraw()],
            this.GetObjectIndicesToDraw(),
        ]
    }
}
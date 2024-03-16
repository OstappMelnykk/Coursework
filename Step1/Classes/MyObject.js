class MyObject {

    #Own20Points
    #Default20Points

    constructor() {

        this.#Own20Points = [
            new Point(1, -1, -1, -1, -1),
            new Point(2, -1, 1, -1, -1),
            new Point(3, -1, 1, -1, 1),
            new Point(4, -1, -1, -1, 1),
            new Point(5, -1, -1, 1, -1),
            new Point(6, -1, 1, 1, -1),
            new Point(7, -1, 1, 1, 1),
            new Point(8, -1, -1, 1, 1),
        ]


        this.CalcMiddlePoints()


        this.#Default20Points = (new Cube()).DefaultValues()

        console.log(this.#Own20Points)
        console.log(this.#Default20Points)
    }



    #Indices = [
        0, 1, 1, 2, 2, 3, 3, 0,
        0, 4, 1, 5, 2, 6, 3, 7,
        4, 5, 5, 6, 6, 7, 7, 4
    ]


    #SupCub



    Devide(num_X, num_Y, num_Z) {

        let Points_OfSuperCube = []
        let IndicesToDraw_OfSuperCube = []



        this.#SupCub = new SuperCube()
        this.#SupCub.Devide(num_X, num_Y, num_Z)

        for (let _cube of this.#SupCub.Cubes){
            Points_OfSuperCube.push(..._cube.Points)
            IndicesToDraw_OfSuperCube.push(..._cube.IndicesToDraw)
        }

        let NewPoints = this.CalcNewPoints(Points_OfSuperCube)


        let PointsToDraw = []
        for (let point of NewPoints) {
            PointsToDraw.push(point.X)
            PointsToDraw.push(point.Y)
            PointsToDraw.push(point.Z)
        }

        return [
            PointsToDraw,
            IndicesToDraw_OfSuperCube
        ]
    }


    Fi(i, lk, bk, gk){

        let mul1 = 1 + lk * this.#Default20Points[i - 1].X
        let mul2 = 1 + bk * this.#Default20Points[i - 1].Y
        let mul3 = 1 + gk * this.#Default20Points[i - 1].Z

        if (i <= 8){
            let mul4 = mul1 + mul2 + mul3 - 5

            return 1/8 * mul1 * mul2 * mul3 * mul4
        }
        else{
            let df_X_i = this.#Default20Points[i - 1].X
            let df_Y_i = this.#Default20Points[i - 1].Y
            let df_Z_i = this.#Default20Points[i - 1].Z


            let m1 = Math.pow(lk * df_Y_i * df_Z_i, 2)
            let m2 = Math.pow(bk * df_X_i * df_Z_i, 2)
            let m3 = Math.pow(gk * df_X_i * df_Y_i, 2)

            let mul4 = 1 - m1 - m2 - m3

            return 1/4 * mul1 * mul2 * mul3 * mul4
        }
    }

    CalcNewPoints(points){

        let NewPoints = []

        for (let j = 0; j < points.length; j++) {

            let Xk = 0
            let Yk = 0
            let Zk = 0

            for (let i = 0; i < 20; i++) {

                let fi = this.Fi(i + 1, points[j].X, points[j].Y, points[j].Z)
                Xk += this.#Own20Points[i].X * fi
                Yk += this.#Own20Points[i].Y * fi
                Zk += this.#Own20Points[i].Z * fi
            }

            NewPoints.push(
                new Point(
                    points[j].LocalID,
                    points[j].GlobalID,
                    Xk,
                    Yk,
                    Zk
                )
            )
        }
        return NewPoints
    }

    Global_Numeration_Sorting(point1, point2) {
        if (point1.Y !== point2.Y)
            return point1.Y - point2.Y;
        if (point1.Z !== point2.Z)
            return point1.Z - point2.Z;

        return point1.X - point2.X;
    }
    Local_Numeration_Sorting(point1, point2) {return point1.LocalID - point2.LocalID;}


    CalcMiddlePoints(){
        let k = 9
        for (let i = 0; i < this.#Indices.length; i += 2) {
            let idx1 = this.#Indices[i]
            let idx2 = this.#Indices[i + 1]

            const point1 = this.#Own20Points[idx1];
            const point2 = this.#Own20Points[idx2];

            let midX = (point1.X + point2.X) / 2
            let midY = (point1.Y + point2.Y) / 2
            let midZ = (point1.Z + point2.Z) / 2

            this.#Own20Points.push(new Point(k, -1, midX, midY, midZ))
            k++
        }
        this.#Own20Points.sort(this.Global_Numeration_Sorting)


        for (let i = 0; i <  this.#Own20Points.length; i++) {
            this.#Own20Points[i].GlobalID = i + 1;
        }

        this.#Own20Points.sort(this.Local_Numeration_Sorting)
    }
}
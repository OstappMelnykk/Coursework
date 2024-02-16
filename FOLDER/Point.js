class Point {
    #LocalID
    #GlobalID

    #X_coordinate
    #Y_coordinate
    #Z_coordinate

    constructor(_LocalID = -1, _GlobalID = -1,
                x = 0.0,
                y = 0.0,
                z = 0.0)
    {
        this.#X_coordinate = x
        this.#Y_coordinate = y
        this.#Z_coordinate = z

        this.#LocalID = _LocalID
        this.#GlobalID = _GlobalID
    }

    copy(LocalID = -1, GlobalID = -1){
        return new Point(LocalID, GlobalID,
            this.#X_coordinate,
            this.#Y_coordinate,
            this.#Z_coordinate,
            )

    }

    print(){
        console.log(
            `POINT: 
                LocalID:  ${ this.#LocalID }
                GlobalID: ${ this.#GlobalID }
                (X, Y, Z) = (${this.#X_coordinate}, ${this.#Y_coordinate}, ${this.#Z_coordinate})`);
    }


    set LocalID(_LocalID){ this.#LocalID = _LocalID }
    get LocalID(){ return this.#LocalID }

    set GlobalID(_GlobalID){ this.#GlobalID = _GlobalID }
    get GlobalID(){ return this.#GlobalID }


    set X(x){ this.#X_coordinate= x }
    get X(){ return this.#X_coordinate }


    set Y(y){ this.#Y_coordinate= y }
    get Y(){ return this.#Y_coordinate }


    set Z(z){ this.#Z_coordinate= z }
    get Z(){ return this.#Z_coordinate }
}
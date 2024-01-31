class Point{
    #X_coordinate
    #Y_coordinate
    #Z_coordinate

    #InnerID
    #GeneralID
    constructor(_InnerID = -1, _GeneralID = -1, x = 0.0, y = 0.0, z = 0.0) {
        this.#X_coordinate = parseFloat(x)
        this.#Y_coordinate = parseFloat(y)
        this.#Z_coordinate = parseFloat(z)

        this.InnerID = _InnerID
        this.GeneralID = _GeneralID
    }

    set InnerID(InnerID){ this.#InnerID= InnerID; }
    get InnerID(){ return this.#InnerID; }

    set GeneralID(GeneralID){ this.#GeneralID = GeneralID; }
    get GeneralID(){ return this.#GeneralID; }


    set X(x){ this.#X_coordinate= parseFloat(x); }
    get X(){ return this.#X_coordinate; }

    set Y(y){ this.#Y_coordinate= parseFloat(y); }
    get Y(){ return this.#Y_coordinate; }


    set Z(z){ this.#Z_coordinate= parseFloat(z); }
    get Z(){ return this.#Z_coordinate; }

    print(){
        console.log(`(X, Y, Z) = (${this.#X_coordinate}, ${this.#Y_coordinate}, ${this.#Z_coordinate}) ---   ${ this.#InnerID}`);
    }
}
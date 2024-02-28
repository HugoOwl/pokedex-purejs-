class Pokemon {
    constructor() {
        this.number = '';
        this.name = '';
        this.type = '';
        this.types = [];
        this.photo = '';
        this.base_experience = '';
        this.height = '';
        this.weight = '';
        this.abilities = [];
        this.sprites = {
            front_default: "",
            back_default: "",
            front_shiny: "",
            back_shiny: ""
        };
        this.cries = {
            latest: "",
            legacy: ""
        };
    }
}

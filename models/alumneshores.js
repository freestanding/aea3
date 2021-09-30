const Alumne = require("./alumne");

/**
 * _llista :
 *  { uuid-234235324-234234523: {id: uuid-234235324-234234523, nom: 'pepito', hores: 10 }}
 */

class AlumnesHores {
  _llista = {
    abc: 123,
  };

  get llistatArr() {
    const llistat = [];
    Object.keys(this._llista).forEach((key) => {
      const alumne = this._llista[key];
      llistat.push(alumne);
    });

    return llistat;
  }

  constructor() {
    this._llista = {};
  }

  crearAlumne(nom = "", hores) {
    const alumne = new Alumne(nom, hores);
    this._llista[alumne.id] = alumne;
  }
  carregarAlumnesFromArray(alumnes = []) {
    alumnes.forEach((alumne) => {
      this._llista[alumne.id] = alumne;
    });
  }
  llistarAlumnes() {
    console.log(); // \n

    let conta = 0;
    this.llistatArr.forEach((alumne) => {
      const { nom } = alumne;
      conta += 1;
      console.log(`${(conta + ".").green} ${nom}`);
    });
  }
  llistarAlumnesHores() {
    console.log(); // \n

    let conta = 0;
    this.llistatArr.forEach((alumne) => {
      const { nom, horesFetes } = alumne;
      conta += 1;
      const hores =
        horesFetes > 0 ? `${horesFetes}`.green : `${horesFetes}`.red;

      //const prova = true ? "hola" : "adeu"; //condicional ternari

      console.log(
        `${(conta + ".").green} ${`Nom`.yellow} ${`${nom}`.cyan} :: ${
          `Hores`.yellow
        } ${hores}`
      );
    });
  }

  guardarHores(id = "", hores) {
    const alumne = this._llista[id];
    alumne.horesFetes = hores;
    return alumne.nom;
  }
  async eliminarAlumne(id = "") {
    delete this._llista[id];
  }
}

module.exports = AlumnesHores;

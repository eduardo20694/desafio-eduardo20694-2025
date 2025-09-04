class AbrigoAnimais {
  constructor() {
    // Lista de animais e seus brinquedos favoritos
    this.animaisValidos = {
      Rex: ["RATO", "BOLA"],
      Mimi: ["BOLA", "LASER"],
      Fofo: ["BOLA", "RATO", "LASER"],
      Zero: ["RATO", "BOLA"],
      Bola: ["CAIXA", "NOVELO"],
      Bebe: ["LASER", "RATO", "BOLA"],
      Loco: ["SKATE", "RATO"]
    };

    // Lista de brinquedos válidos no abrigo
    this.brinquedosValidos = ["RATO", "BOLA", "LASER", "NOVELO", "CAIXA", "SKATE"];
  }

  // Verifica se o animal é válido
  rejeitaAnimalInvalido(animal) {
    return this.animaisValidos.hasOwnProperty(animal);
  }

  // Verifica se os brinquedos são válidos e não duplicados
  validaBrinquedos(brinquedos) {
    const lista = brinquedos.split(",");
    const temDuplicado = new Set(lista).size !== lista.length;
    const temInvalido = lista.some(b => !this.brinquedosValidos.includes(b));
    return !(temDuplicado || temInvalido);
  }

  // Limita o número de animais por pessoa
  limiteAnimaisPorPessoa(animaisPessoa) {
    return animaisPessoa.length > 3 ? "Limite excedido" : "Ok";
  }

  // Verifica se os brinquedos da pessoa seguem a ordem desejada pelo animal
  confereOrdem(animalFavoritos, brinquedosPessoa) {
    let idx = 0;
    for (let brinquedo of brinquedosPessoa) {
      if (brinquedo === animalFavoritos[idx]) idx++;
      if (idx === animalFavoritos.length) return true; // Todos os brinquedos favoritos foram encontrados na ordem
    }
    return false; // Ordem não seguida
  }

  // Lógica principal para encontrar pessoas aptas a adotar os animais
  encontraPessoas(brinquedosP1, brinquedosP2, animais) {
    const lista = [];
    const animaisArray = animais.split(",");

    // Validação de animais
    for (let animal of animaisArray) {
      if (!this.rejeitaAnimalInvalido(animal)) return { erro: "Animal inválido" };
    }

    // Validação de brinquedos
    if (!this.validaBrinquedos(brinquedosP1) || !this.validaBrinquedos(brinquedosP2)) {
      return { erro: "Brinquedo inválido" };
    }

    const p1 = brinquedosP1.split(",");
    const p2 = brinquedosP2.split(",");

    // Avaliação de cada animal
    animaisArray.forEach(animal => {
      const favoritos = this.animaisValidos[animal];

      // Regra especial do Loco: se estiver sozinho, vai para abrigo; senão, qualquer pessoa pode levar
      if (animal === "Loco") {
        lista.push(animaisArray.length > 1 ? `${animal} - pessoa 1` : `${animal} - abrigo`);
        return;
      }

      // Gatos não dividem brinquedos: se mais de uma pessoa conseguir, vai para abrigo
      if (["Mimi", "Fofo", "Zero"].includes(animal)) {
        const p1Ok = this.confereOrdem(favoritos, p1);
        const p2Ok = this.confereOrdem(favoritos, p2);

        if (p1Ok && p2Ok) lista.push(`${animal} - abrigo`);
        else if (p1Ok) lista.push(`${animal} - pessoa 1`);
        else if (p2Ok) lista.push(`${animal} - pessoa 2`);
        else lista.push(`${animal} - abrigo`);

        return;
      }

      // Cães podem intercalar brinquedos
      const p1Ok = this.confereOrdem(favoritos, p1);
      const p2Ok = this.confereOrdem(favoritos, p2);
      if (p1Ok && !p2Ok) lista.push(`${animal} - pessoa 1`);
      else if (!p1Ok && p2Ok) lista.push(`${animal} - pessoa 2`);
      else lista.push(`${animal} - abrigo`);
    });

    // Ordena a lista alfabeticamente antes de retornar
    lista.sort();
    return { lista, erro: false };
  }

  // Lógica específica para enviar o Loco para o abrigo
  locoVaiParaAbrigo(animal) {
    return `${animal} - abrigo`;
  }
}

export { AbrigoAnimais };

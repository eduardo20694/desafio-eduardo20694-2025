import { AbrigoAnimais } from "./abrigo-animais.js";

describe("Abrigo de Animais", () => {
  // Testa se o sistema rejeita corretamente animais que não existem no abrigo
  test("Deve rejeitar animal inválido", () => {
    const abrigo = new AbrigoAnimais();
    expect(abrigo.rejeitaAnimalInvalido("Cachorro")).toBe(false); // não existe no abrigo
    expect(abrigo.rejeitaAnimalInvalido("Fofo")).toBe(true); // está cadastrado
  });

  // Verifica se o sistema consegue encontrar uma pessoa certa para adotar um animal
  test("Deve encontrar pessoa para um animal", () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      "RATO,BOLA",
      "RATO,NOVELO",
      "Rex,Fofo"
    );
    expect(resultado.lista[0]).toBe("Fofo - abrigo"); // Fofo não achou pessoa
    expect(resultado.lista[1]).toBe("Rex - pessoa 1"); // Rex foi adotado pela pessoa 1
    expect(resultado.lista.length).toBe(2);
    expect(resultado.erro).toBeFalsy(); // não houve erro
  });

  // Garante que o sistema respeita a ordem e regras quando os brinquedos se intercalam
  test("Deve encontrar pessoa intercalando brinquedos", () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      "BOLA,LASER",
      "BOLA,NOVELO,RATO,LASER",
      "Mimi,Fofo,Rex,Bola"
    );
    expect(resultado.lista[0]).toBe("Bola - abrigo"); // Bola não encontrou dono
    expect(resultado.lista[1]).toBe("Fofo - pessoa 2"); // Fofo foi adotado pela pessoa 2
    expect(resultado.lista[2]).toBe("Mimi - abrigo"); // Mimi não conseguiu se adaptar
    expect(resultado.lista[3]).toBe("Rex - abrigo"); // Rex também ficou no abrigo
  });

  // Caso especial: se o animal Loco estiver sozinho, sempre vai para o abrigo
  test("Loco deve ir para o abrigo se estiver sozinho", () => {
    const resultado = new AbrigoAnimais().locoVaiParaAbrigo("Loco");
    expect(resultado).toBe("Loco - abrigo");
  });

  // Valida a regra de limite máximo de animais por pessoa (3 no total)
  test("Pessoa não pode adotar mais de 3 animais", () => {
    const resultado = new AbrigoAnimais().limiteAnimaisPorPessoa(["Rex", "Fofo", "Bola", "Mimi"]);
    expect(resultado).toBe("Limite excedido");
  });
});

class ValidationContract {
  constructor() {
    this.error = [];
  }

  isRequired(value, message) {
    if (!value || value.length <= 0) this.error.push({ message: message });
  }

  hasMinLen(value, min, message) {
    if (!value || value.length < min) this.error.push({ message: message });
  }

  hasMaxLen(value, max, message) {
    if (!value || value.length > max) this.error.push({ message: message });
  }

  isFixedLen(value, len, message) {
    if (value.length != len) this.error.push({ message: message });
  }

  isEmail(value, message) {
    var reg = new RegExp(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/);
    if (!reg.test(value)) this.error.push({ message: message });
  }

  isNotEquals(value1, value2, message) {
    if (value1 !== value2) this.error.push({ message: message });
  }

  isCpf(cpf, message) {
    cpf = cpf.replace(/[^\d]+/g, "");
    if (cpf == "")
      this.error.push({ message: message });
    // Elimina CPFs invalidos conhecidos
    if (
      cpf.length != 11 ||
      cpf == "00000000000" ||
      cpf == "11111111111" ||
      cpf == "22222222222" ||
      cpf == "33333333333" ||
      cpf == "44444444444" ||
      cpf == "55555555555" ||
      cpf == "66666666666" ||
      cpf == "77777777777" ||
      cpf == "88888888888" ||
      cpf == "99999999999"
    ) this.error.push({ message: message });

    // Valida 1o digito
    let add = 0;
    for (let i = 0; i < 9; i++)
      add += parseInt(cpf.charAt(i)) * (10 - i);

    let rev = 11 - (add % 11);
    if (rev == 10 || rev == 11)
      rev = 0;

    if (rev != parseInt(cpf.charAt(9)))
      this.error.push({ message: message });

    add = 0;
    for (let i = 0; i < 10; i++)
      add += parseInt(cpf.charAt(i)) * (11 - i);

    rev = 11 - (add % 11);

    if (rev == 10 || rev == 11) rev = 0;

    if (rev != parseInt(cpf.charAt(10)))
      this.error.push({ message: message });

    return true;
  }

  errors() {
    return this.error;
  }

  clear() {
    this.error = [];
  }

  isValid() {
    return this.error.length == 0;
  }
}

module.exports = ValidationContract;

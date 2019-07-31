"use strict";

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

  isEquals(value1, value2, message) {
    if (value1 === value2) this.error.push({ message: message });
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

function Validator(formSelector) {
  const _this = this;

  function getParent(element, selector) {
    while (element.parentElement) {
      if (element.parentElement.matches(selector)) {
        return element.parentElement;
      }
      element = element.parentElement;
    }
  }

  const ValidatorRules = {
    required: function (value) {
      return value ? undefined : "Vui lòng nhập trường này !";
    },
    email: function (value) {
      const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      return regex.test(value) ? undefined : "Vui lòng nhập đúng email !";
    },
    min: function (min) {
      return function (value) {
        return value.length >= min
          ? undefined
          : `Vui lòng nhập tổi thiểu ${min} kí tự !`;
      };
    },
  };

  const formRules = {};
  // lay ra form trong DOM
  const formElement = document.querySelector(formSelector);
  // kiem tra form if it do exsit
  if (formElement) {
    // lấy ra tất cả các thẻ input có trong form
    const inputs = formElement.querySelectorAll("[name][rules]");
    for (let input of inputs) {
      // thẻ input này được đặt 1 attribute là rules và các rules được
      // ngăn cách bởi dấu |
      const rules = input.getAttribute("rules").split("|");
      // loop rules
      for (let rule of rules) {
        let ruleInfo;
        const isRuleHasValue = rule.includes(":");
        // xử lý nếu rule có yêu cầu cấp 2(pwd thì là min hoặc max kí tự)
        if (isRuleHasValue) {
          ruleInfo = rule.split(":");
          rule = ruleInfo[0];
        }
        let ruleFunc = ValidatorRules[rule];

        if (isRuleHasValue) {
          ruleFunc = ruleFunc(ruleInfo[1]);
        }
        if (Array.isArray(formRules[input.name])) {
          formRules[input.name].push(ruleFunc);
        } else {
          formRules[input.name] = [ruleFunc];
        }
      }
      //  lắng nghe sự kiện và xử lý
      input.onblur = handleValidate;
      input.oninput = handleClearError;
    }

    function handleValidate(event) {
      // lấy ra các phương thức quy ước được định nghĩa
      const rules = formRules[event.target.name];
      let errorMessage;
      for (let rule of rules) {
        errorMessage = rule(event.target.value);
        if (errorMessage) break;
      }

      if (errorMessage) {
        const formGroup = getParent(event.target, ".form-group");
        if (formGroup) {
          formGroup.classList.add("invalid");
          let errorElement = formGroup.querySelector(".form-message");
          if (errorElement) {
            errorElement.innerText = errorMessage;
          }
        }
      }
      return errorMessage === undefined;
    }
    function handleClearError(event) {
      const formGroup = getParent(event.target, ".form-group");
      if (formGroup.classList.contains("invalid")) {
        formGroup.classList.remove("invalid");
        let errorElement = formGroup.querySelector(".form-message");
        if (errorElement) {
          errorElement.innerText = "";
        }
      }
    }
  }
  // xu ly hanh vi submit form
  formElement.onsubmit = function (e) {
    e.preventDefault();
    const inputs = formElement.querySelectorAll("[name][rules]");
    let isValid = true;
    for (let input of inputs) {
      let isFormValid = handleValidate({ target: input });
      if (isFormValid === false) {
        isValid = false;
      }
    }
    if (isValid === true) {
      if (typeof _this.onSubmit === "function") {
        const enableInputs = formElement.querySelectorAll("[name]");
        const formValues = Array.from(enableInputs).reduce(function (
          values,
          input
        ) {
          switch (input.type) {
            case "radio":
              values[input.name] = formElement.querySelector(
                'input[name="' + input.name + '"]:checked'
              ).value;
              break;
            case "checkbox":
              if (!input.matches(":checked")) return values;
              if (!Array.isArray(values[input.name])) {
                values[input.name] = [];
              }
              values[input.name].push(input.value);

              break;
            case "file":
              values[input.name] = input.file;
              break;
            default:
              values[input.name] = input.value;
          }
          return values;
        },
        {});
        _this.onSubmit(formValues);
      } else {
        formElement.submit();
      }
    }
  };
}

export default Validator;

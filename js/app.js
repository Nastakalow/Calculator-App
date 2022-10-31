$(document).ready(function () {
  let firstStr = "";
  let secondStr = "";
  let displayStr = " ";
  let operator = "";
  let firstNum;
  let secondNum;
  let resultCompute;
  let resultDel;
  let isOperator = false;
  let zeroDivided = false;

  $(".keys-btn").on("click", parseNumber);

  function getFirstNum(num) {
    if (num == "." && !firstStr) {
      firstStr = "0" + num;
      displayStr = firstStr;
    } else if (
      num != "DEL" &&
      num != "RESET" &&
      num != "=" &&
      num != "+" &&
      num != "-" &&
      num != "x" &&
      num != "/"
    ) {
      if (firstStr.length <= 7) {
        firstStr += num;
        displayStr = firstStr;
      }
    } else if (num == "DEL") {
      displayStr = resultDel;
    }

    $(".display-content h3").html(displayStr);

    return firstStr;
  }

  function getSecondNum(num) {
    if (num == "." && !secondStr) {
      secondStr = "0" + num;
      displayStr = displayStr + "0" + num;
    } else if (
      num != "DEL" &&
      num != "RESET" &&
      num != "=" &&
      num != "+" &&
      num != "-" &&
      num != "x" &&
      num != "/"
    ) {
      if (secondStr.length <= 7) {
        secondStr += num;
        displayStr += num;
      }
    } else if (
      (num == "+" || num == "-" || num == "x" || num == "/") &&
      !secondNum
    ) {
      if (resultCompute && !firstStr) {
        displayStr = resultCompute + num;
      } else {
        displayStr = firstStr + num;
      }
      $(".display-content h3").html(displayStr);
    } else if (num == "=") {
      if (resultCompute > 999999999) {
        resultCompute = resultCompute.toExponential();
        displayStr = resultCompute;
      } else if (typeof resultCompute != "string" && resultCompute % 1 === 0) {
        resultCompute += "";
        if (resultCompute.length >= 4) {
          resultCompute = resultCompute.split("");
          resultCompute.splice(-3, 0, ",");
          if (resultCompute.length > 7) {
            resultCompute.splice(-7, 0, ",");
          }
          resultCompute = resultCompute.join("");
        }
      } else if (
        resultCompute == 0.30000000000000004 ||
        resultCompute == 0.7999999999999999
      ) {
        resultCompute = parseFloat(Number(resultCompute).toFixed(2));
      } else {
        resultCompute += "";

        resultCompute = resultCompute.replace(",", "");
        firstNum = resultCompute;
      }
      $(".display-content h3").html(resultCompute);

      resetAll();
      return;
    }

    $(".display-content h3").html(displayStr);

    return secondStr;
  }

  function parseNumber() {
    let buttonPressed = $(this).html();
    if (
      (buttonPressed == "+" ||
        buttonPressed == "-" ||
        buttonPressed == "x" ||
        buttonPressed == "/") &&
      firstNum &&
      firstNum.slice(-1) != "."
    ) {
      isOperator = true;
      operator = buttonPressed;
    } else if (buttonPressed == "=" && firstNum && secondNum) {
      resultCompute = computeNumbers(firstNum, secondNum, operator);
    } else if (buttonPressed == "DEL") {
      resultDel = deleteNumber();
    } else if (buttonPressed == "RESET") {
      resetAll();
    }

    if (
      !isOperator &&
      buttonPressed != "+" &&
      buttonPressed != "-" &&
      buttonPressed != "x" &&
      buttonPressed != "/" &&
      (buttonPressed != "0" || firstNum)
    ) {
      firstNum = getFirstNum(buttonPressed);
    } else if (isOperator) {
      secondNum = getSecondNum(buttonPressed);
    }
  }

  function computeNumbers(a, b, operator) {
    if (!zeroDivided) {
      if (operator == "+") {
        return parseFloat(a) + parseFloat(b);
      } else if (operator == "-") {
        return parseFloat(a) - parseFloat(b);
      } else if (operator == "x") {
        return parseFloat(a) * parseFloat(b);
      } else if (operator == "/" && b == "0") {
        zeroDivided = true;
        return "can't divide by zero";
      } else {
        return parseFloat(a) / parseFloat(b);
      }
    } else {
      zeroDivided = false;
      return "NaN";
    }
  }

  function deleteNumber() {
    if (displayStr.length == 1) {
      displayStr = displayStr.slice(0, -1);
      if (secondStr) {
        secondStr = secondStr.slice(0, -1);
      } else if (operator) {
        operator = operator.slice(0, -1);
        isOperator = false;
      } else {
        firstStr = firstStr.slice(0, -1);
      }
      return "0";
    } else if (displayStr !== "0") {
      displayStr = displayStr.slice(0, -1);
      if (secondStr) {
        secondStr = secondStr.slice(0, -1);
      } else if (operator) {
        operator = operator.slice(0, -1);
        isOperator = false;
      } else {
        firstStr = firstStr.slice(0, -1);
      }
    }

    return displayStr;
  }

  function resetAll() {
    firstStr = "";
    secondStr = "";
    displayStr = "0";
    operator = "";
    isOperator = false;
  }

  changeTheme();

  function changeTheme() {
    $("#themeOne").change(() => {
      $(document.body).removeClass("theme-two");
      $(document.body).removeClass("theme-three");
    });
    $("#themeTwo").change(() => {
      $(document.body).removeClass("theme-three");
      $(document.body).addClass("theme-two");
    });
    $("#themeThree").change(() => {
      $(document.body).removeClass("theme-two");
      $(document.body).addClass("theme-three");
    });
  }
});

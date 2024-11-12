let currentInput = '';
let currentOperation = null;
let previousInput = '';

// Mapeamento das teclas para os botões da calculadora
const keyMap = {
  '0': () => appendNumber(0),
  '1': () => appendNumber(1),
  '2': () => appendNumber(2),
  '3': () => appendNumber(3),
  '4': () => appendNumber(4),
  '5': () => appendNumber(5),
  '6': () => appendNumber(6),
  '7': () => appendNumber(7),
  '8': () => appendNumber(8),
  '9': () => appendNumber(9),
  ',': () => appendComma(),
  '+': () => setOperation('+'),
  '-': () => setOperation('-'),
  '*': () => setOperation('*'),
  '/': () => setOperation('/'),
  '=': () => calculate(),
  'Enter': () => calculate(),
  'Escape': () => clearDisplay(),  // A tecla 'Escmpa tudo (C)
  'Delete': () => clearEntry(),  // A tecla 'Delete' funciona como CE
};

document.addEventListener('keydown', (event) => {
  const key = event.key;

  // Verifica se a tecla pressionada é mapeada e executa a função correspondente
  if (keyMap[key]) {
    keyMap[key]();
  }
});

// Função para adicionar números ao display
function appendNumber(number) {
  currentInput += number.toString();
  updateDisplay();
}

// Função para adicionar a vírgula
function appendComma() {
  if (!currentInput.includes(',')) {
    currentInput += ',';
    updateDisplay();
  }
}

// Função para definir a operação matemática
function setOperation(operator) {
  if (currentInput === '') return;
  if (previousInput !== '') {
    calculate();
  }
  currentOperation = operator;
  previousInput = currentInput;
  currentInput = '';
}

// Função para calcular a operação
function calculate() {
  if (previousInput === '' || currentInput === '') return;

  let result;
  let prev = parseFloat(previousInput.replace(',', '.'));
  let current = parseFloat(currentInput.replace(',', '.'));

  switch (currentOperation) {
    case '+':
      result = prev + current;
      break;
    case '-':
      result = prev - current;
      break;
    case '*':
      result = prev * current;
      break;
    case '/':
      result = prev / current;
      break;
    default:
      return;
  }

  currentInput = result.toString().replace('.', ',');
  currentOperation = null;
  previousInput = '';
  updateDisplay();
}

// Função para limpar tudo (C)
function clearDisplay() {
  currentInput = '';
  previousInput = '';
  currentOperation = null;
  updateDisplay();
}

// Função para limpar a entrada (CE)
function clearEntry() {
  currentInput = '';
  updateDisplay();
}

// Função para atualizar o display
function updateDisplay() {
  document.getElementById('display').value = currentInput || '0';
}

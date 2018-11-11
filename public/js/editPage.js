const formElements = [...document.getElementById('update-form')];
const enableUpdateBtn = () => {
  console.log('enable btn');
  document.getElementById('update-btn').disabled = false;
  removeListeners();
}

const removeListeners = () => {
  formElements.forEach(el => {
    const eventType = el.nodeName === 'SELECT' ? 'change' : 'keydown';
    el.removeEventListener(eventType, enableUpdateBtn)
  })
}

const addListeners = () => {
  formElements.forEach(el => {
    const eventType = el.nodeName === 'SELECT' ? 'change' : 'keydown';
    el.addEventListener(eventType, enableUpdateBtn)
  });
}

addListeners();

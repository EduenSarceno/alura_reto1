;(function() {
const entrada = document.querySelector('#entrada')
const salida = document.querySelector('#salida')
const info = document.querySelector('.barra-lateral .info')

// Area de exportaciones
window.uiDesencriptar = uiDesencriptar
window.uiEncriptar = uiEncriptar
entrada.oninput = uiSoloLetras

var kReplace = {
  'e': 'enter',
  'i': 'imes',
  'a': 'ai',
  'o': 'ober',
  'u': 'ufat'
}

var kInvReplace = {}
function crearInvReplace() {
  for (const entry in kReplace) {
    kInvReplace[kReplace[entry]] = entry
  }
}
crearInvReplace()

function encriptar(txt) {
  var str = ''
  for (const char of txt) {
    if (kReplace[char]) {
      str += kReplace[char]
    } else {
      str += char
    }
  }
  return str
}

function desEncriptar(txt) {
  var str = ''
  var len = txt.length
  next_char:
  for (var i = 0; i < len;) {
    for (const entry in kInvReplace) {
      if ((txt[i] === entry[0]) && empiezaCon(txt, entry, i)) {
        str += kInvReplace[entry]
        i += entry.length
        continue next_char
      }
    }
    str += txt[i++]
  }
  return str
}

function empiezaCon(a, b, i) {
  for (var j = 0; j < b.length; j++) {
    if (b[j] !== a[i + j]) {
      break
    }
  }
  return j == b.length
}

function ocultarInfo() {
  info.style.display = 'none'
}

function mostrarInfo() {
  info.style.display = 'block'
}

const kAllowedChars = 'a-z '
const kAllowed = new RegExp(`[${kAllowedChars}]`, 'g')
const kUnAllowed = new RegExp(`[^${kAllowedChars}]`, 'g')

function uiSoloLetras(ev) {
  const { inputType, target } = ev
  var data = ev.data
  if (inputType === 'deleteContentBackward') {
    return
  } else if (inputType === 'insertFromPaste') {
    data = data.toLowerCase()
    data = data.replace(kUnAllowed, '')
    target.value = data
    if (data !== ev.data) {
      alert('se ha modificado el texto para coincidir con los carácteres permitidos')
    }
    return
  } else if (inputType === 'insertText') {
    if (!kAllowed.test(data)) {
      let value = target.value
      target.value = value.substring(0, value.length - 1)
      alert('solo letras minúsculas y sin acentos')
    }
  }
}

function uiDesencriptar() {
  var txt = entrada.value
  if (txt.length === 0) {
    salida.textContent = ''
    mostrarInfo()
    return
  }
  salida.textContent = desEncriptar(entrada.value)
  ocultarInfo()
}

function uiEncriptar() {
  var txt = entrada.value
  if (txt.length === 0) {
    salida.textContent = ''
    mostrarInfo()
    return
  }
  salida.textContent = encriptar(entrada.value)
  ocultarInfo()
}

}())

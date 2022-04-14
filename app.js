;(function() {

// Area de exportaciones
window.uiDesencriptar = uiDesencriptar
window.uiEncriptar = uiEncriptar

const entrada = document.querySelector('#entrada')
const salida = document.querySelector('#salida')

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
  for (var i = 0; i < len; i++) {
    for (const entry in kInvReplace) {
      if ((txt[i] == entry[0]) && empiezaCon(txt, entry, i)) {
        str += kInvReplace[entry]
        i += entry.length - 1
        continue next_char
      }
    }
    str += txt[i]
  }
  return str
}

function empiezaCon(a, b, i) {
  for (var j = 0; j < b.length; j++) {
    if (b[j] !== a[i + j])
      break
  }
  return j == b.length
}

function uiDesencriptar(ev) {
  salida.value = desEncriptar(entrada.value)
}

function uiEncriptar(ev) {
  salida.value = encriptar(entrada.value)
}

}())

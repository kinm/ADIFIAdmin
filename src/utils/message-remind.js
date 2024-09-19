
export function elMessage(that, message, type = 'warning', showClose = true) {
  return that.$message({
    showClose,
    message,
    type
  })
}

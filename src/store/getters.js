const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  username: state => state.user.username,
  buttonRoles: state => state.user.buttonRoles,
  roles: state => state.user.roles,
  newRoutes: state => state.user.newRoutes
}
export default getters

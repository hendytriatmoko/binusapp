export default function ({ app, route, redirect }) {
  if (route.path == '/login') {
    if (app.$cookies.get('user') != null) {
      return redirect('/')
    }
  }else{
    if (app.$cookies.get('user') == null) {
      return redirect('/login')
    }
  }

  // if (route.path == '/users') {
  //   if (app.$cookies.get('user') == null) {
  //     app.$cookies.set('prevUrl', route.path)
  //     return redirect('/login')
  //   }
  // }
}

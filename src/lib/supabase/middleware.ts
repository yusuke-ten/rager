import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value),
          )
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          )
        },
      },
    },
  )

  // 重要：createServerClientとsupabase.auth.getUser()の間にロジックを書かないでください。
  // 単純なミスでも、ユーザーがランダムにログアウトされる問題のデバッグが非常に困難になる可能性があります。

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (
    user &&
    (request.nextUrl.pathname.startsWith('/login') ||
      request.nextUrl.pathname.startsWith('/signup'))
  ) {
    const url = request.nextUrl.clone()
    url.pathname = '/dashboard/knowledge'
    return NextResponse.redirect(url)
  }

  if (
    !user &&
    !request.nextUrl.pathname.startsWith('/login') &&
    !request.nextUrl.pathname.startsWith('/signup')
  ) {
    // ユーザーがいない場合、ログインページにリダイレクトする
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  // 重要：supabaseResponseオブジェクトをそのまま返す必要があります。
  // NextResponse.next()で新しいレスポンスオブジェクトを作成する場合は、以下の点に注意してください：
  // 1. 以下のようにリクエストを渡してください：
  //    const myNewResponse = NextResponse.next({ request })
  // 2. 以下のようにクッキーをコピーしてください：
  //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
  // 3. myNewResponseオブジェクトを必要に応じて変更しますが、クッキーは変更しないでください！
  // 4. 最後に：
  //    return myNewResponse
  // これを行わないと、ブラウザとサーバーが同期しなくなり、ユーザーのセッションが早期に終了する可能性があります！

  return supabaseResponse
}

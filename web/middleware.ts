import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function middleware(req: NextRequest, res: NextResponse) {
  // const sid = req.cookies.get("sid")?.value;
  // if (!sid) return;
  // console.log(sid);

  return NextResponse.next();
}

// export const config = {
//   matcher: ["/users"],
// };

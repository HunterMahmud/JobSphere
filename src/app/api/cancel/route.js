
import {NextResponse} from "next/server";
export async function POST(req,res) {
        return NextResponse.redirect(new URL('/payment/cancel', req.url),303)
}

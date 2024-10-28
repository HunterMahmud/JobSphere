
import {NextResponse} from "next/server";
export async function POST(req,res) {
        return NextResponse.redirect(new URL('/payment/success', req.url),303)
}

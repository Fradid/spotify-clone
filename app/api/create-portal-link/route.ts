import { stripe } from "@/libs/stripe";
import { createOrRetrieveACustomer } from "@/libs/supabaseAdmin";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { getURL } from "next/dist/shared/lib/utils";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
	try {
		const supabase = createRouteHandlerClient({
			cookies,
		});

		const {
			data: { user },
		} = await supabase.auth.getUser();

		if (!user) throw new Error("Could not get user");

		const customer = await createOrRetrieveACustomer({
			uuid: user?.id || "",
			email: user?.email || "",
		});

		if (!customer) throw new Error("Could not get customer");

		const { url } = await stripe.billingPortal.sessions.create({
			customer,
			return_url: `${getURL()}/account`,
		});

		return NextResponse.json({ url });
	} catch (error: any) {
		console.log(error);
		return new NextResponse("Internal Error", { status: 500 });
	}
}

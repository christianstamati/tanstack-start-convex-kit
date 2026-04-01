import GitHub from "@auth/core/providers/github";
import Google from "@auth/core/providers/google";
import Resend from "@auth/core/providers/resend";
import { Password } from "@convex-dev/auth/providers/Password";
import { convexAuth } from "@convex-dev/auth/server";
import { generateRandomString, type RandomReader } from "@oslojs/crypto/random";
import { Resend as ResendAPI } from "resend";
import type { DataModel } from "./_generated/dataModel";

export const ResendOTP = Resend({
	id: "resend-otp",
	apiKey: process.env.AUTH_RESEND_KEY,
	async generateVerificationToken() {
		const random: RandomReader = {
			read(bytes) {
				crypto.getRandomValues(bytes);
			},
		};

		const alphabet = "0123456789";
		const length = 8;
		return generateRandomString(random, alphabet, length);
	},
	async sendVerificationRequest({ identifier: email, provider, token }) {
		const resend = new ResendAPI(provider.apiKey);
		const { error } = await resend.emails.send({
			from: "My App <onboarding@resend.dev>",
			to: [email],
			subject: "Verify your email",
			text: "Your verification code is " + token,
		});

		if (error) {
			throw new Error("Could not send");
		}
	},
});

const ResendOTPPasswordReset = Resend({
	id: "resend-otp",
	apiKey: process.env.AUTH_RESEND_KEY,
	async generateVerificationToken() {
		const random: RandomReader = {
			read(bytes) {
				crypto.getRandomValues(bytes);
			},
		};

		const alphabet = "0123456789";
		const length = 8;
		return generateRandomString(random, alphabet, length);
	},
	async sendVerificationRequest({ identifier: email, provider, token }) {
		const resend = new ResendAPI(provider.apiKey);
		const siteUrl = (process.env.SITE_URL ?? "http://localhost:3000").replace(
			/\/$/,
			"",
		);
		const resetLink = `${siteUrl}/reset-password?token=${encodeURIComponent(token)}`;
		const { error } = await resend.emails.send({
			from: "My App <onboarding@resend.dev>",
			to: [email],
			subject: `Reset your password in My App`,
			text: `Reset your password: ${resetLink}\n\nOr use this code: ${token}`,
			html: `<p><a href="${resetLink}">Reset your password</a></p><p>Or use this code: <strong>${token}</strong></p>`,
		});

		if (error) {
			throw new Error("Could not send");
		}
	},
});

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
	providers: [
		GitHub,
		Google,
		Password<DataModel>({
			reset: ResendOTPPasswordReset,
			verify: ResendOTP,
			profile(params) {
				return {
					name: params?.name as string,
					email: params?.email as string,
				};
			},
		}),
	],
});

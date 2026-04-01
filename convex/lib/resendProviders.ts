import Resend from "@auth/core/providers/resend";
import { generateRandomString, type RandomReader } from "@oslojs/crypto/random";
import { Resend as ResendAPI } from "resend";

function generateOtpToken(): string {
	const random: RandomReader = {
		read(bytes) {
			crypto.getRandomValues(bytes);
		},
	};
	return generateRandomString(random, "0123456789", 8);
}

export const ResendOTP = Resend({
	id: "resend-email-verify",
	apiKey: process.env.AUTH_RESEND_KEY,
	async generateVerificationToken() {
		return generateOtpToken();
	},
	async sendVerificationRequest({ identifier: email, provider, token }) {
		const resend = new ResendAPI(provider.apiKey);
		const { error } = await resend.emails.send({
			from: "My App <onboarding@resend.dev>",
			to: [email],
			subject: "Verify your email",
			text: `Your verification code is ${token}`,
		});

		if (error) {
			throw new Error("Could not send");
		}
	},
});

export const ResendOTPPasswordReset = Resend({
	id: "resend-password-reset",
	apiKey: process.env.AUTH_RESEND_KEY,
	async generateVerificationToken() {
		return generateOtpToken();
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

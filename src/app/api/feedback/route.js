import { NextResponse } from 'next/server';
import { supabaseServer } from '../../lib/supabaseServer';
import { generateAIOutputs } from '../../lib/gemini';

export async function POST(req) {
    try {
        const { rating, review } = await req.json();

        if (!rating || !review) {
            return NextResponse.json({ error: 'Rating and review required' }, { status: 400 });
        }

        const ai = await generateAIOutputs(rating, review);

        const { error } = await supabaseServer.from('feedback').insert({
            rating,
            review,
            ai_user_response: ai.userResponse,
            ai_summary: ai.summary,
            ai_recommended_actions: ai.recommendedActions.join('\n')
        });

        if (error) throw error;

        return NextResponse.json({ userResponse: ai.userResponse });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
    }
}

export async function GET() {
    const { data } = await supabaseServer
        .from('feedback')
        .select('*')
        .order('created_at', { ascending: false });

    return NextResponse.json(data || []);
}

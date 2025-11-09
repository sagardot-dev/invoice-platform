export async function POST(req: Request) {
    const {name, email, status} = await req.json();

}
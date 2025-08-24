

// export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
//   try {
//     await dbConnect();
//     const cloth = await clothModel.findById(params.id);

//     if (!cloth) {
//       return NextResponse.json({ message: "Not found" }, { status: 404 });
//     }

//     return NextResponse.json(cloth);
//   } catch (error) {
//     return NextResponse.json({ message: "Error fetching cloth" }, { status: 500 });
//   }
// }




// export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
//   try {
//     await dbConnect();
//     const body = await req.json();
//     const updated = await clothModel.findByIdAndUpdate(params.id, body, { new: true });
//     return NextResponse.json(updated);
//   } catch (error) {
//     return NextResponse.json({ message: "Error updating cloth" }, { status: 500 });
//   }
// }

export async function DELETE() {
//   try {
//     await dbConnect();
//     await clothModel.findByIdAndDelete(params.id);
//     return NextResponse.json({ message: "Cloth deleted" });
//   } catch (error) {
//     return NextResponse.json({ message: "Error deleting cloth" }, { status: 500 });
//   }
}

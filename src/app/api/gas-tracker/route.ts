import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getTestnetEstimates, getMainnetEstimates } from "../_utils/helpers";

/**
 *
 * @param id = string specifying network (mainnet || goerli || sepolia)
 * @returns gasExtimates = an array containing slow,avg and fast estimates
 * @example {gasEstimates:[{type:0,gas:"1",estimatedTime:"12"},{type:0,gas:"1",estimatedTime:"12"},{type:0,gas:"1",estimatedTime:"12"},],status:200||500}
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  const gasEstimates =
    id === "1" ? await getMainnetEstimates() : await getTestnetEstimates(id);

  return NextResponse.json(gasEstimates);
}

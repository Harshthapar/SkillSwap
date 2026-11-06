/**
 * Transparent, deterministic matching algorithm for SkillSwap.
 * 
 * Score calculation weights:
 * - Reciprocal Match (50% max):
 *    - Direct match: What student A teaches is wanted by student B (+30%)
 *    - Reverse match: What student B teaches is wanted by student A (+20%)
 * - Availability Overlap (25% max):
 *    - Matching availability string (e.g. "Evenings & Weekends" or partial overlap)
 * - Learning Format Compatibility (25% max):
 *    - Exact match or either person prefers "Hybrid"
 */

export function calculateMatchScore(studentA, studentB) {
  if (!studentA || !studentB) return 0;

  // 1. Check if studentA teaches something studentB wants
  const aTeachesWhatBWants = studentA.skillsOffered?.some(sA => 
    studentB.skillsWanted?.some(sB => 
      sA.name.toLowerCase().includes(sB.name.toLowerCase()) || 
      sB.name.toLowerCase().includes(sA.name.toLowerCase()) ||
      sA.category.toLowerCase() === sB.category.toLowerCase()
    )
  );

  // 2. Check if studentB teaches something studentA wants
  const bTeachesWhatAWants = studentB.skillsOffered?.some(sB => 
    studentA.skillsWanted?.some(sA => 
      sB.name.toLowerCase().includes(sA.name.toLowerCase()) || 
      sA.name.toLowerCase().includes(sB.name.toLowerCase()) ||
      sB.category.toLowerCase() === sA.category.toLowerCase()
    )
  );

  let score = 0;

  // Skill reciprocity (up to 55 points)
  if (aTeachesWhatBWants && bTeachesWhatAWants) {
    score += 55;
  } else if (aTeachesWhatBWants || bTeachesWhatAWants) {
    score += 28;
  } else {
    // Cross-domain learning synergy bonus
    score += 15;
  }

  // Availability overlap (up to 25 points)
  const availA = studentA.learningPreferences?.availability || "";
  const availB = studentB.learningPreferences?.availability || "";

  if (availA === availB) {
    score += 25;
  } else if (
    (availA.includes("Weekend") && availB.includes("Weekend")) ||
    (availA.includes("Evening") && availB.includes("Evening")) ||
    (availA.includes("Weekday") && availB.includes("Weekday"))
  ) {
    score += 18;
  } else {
    score += 8;
  }

  // Format compatibility (up to 20 points)
  const formatA = studentA.learningPreferences?.format || "Hybrid";
  const formatB = studentB.learningPreferences?.format || "Hybrid";

  if (formatA === formatB) {
    score += 20;
  } else if (formatA === "Hybrid" || formatB === "Hybrid") {
    score += 16;
  } else {
    score += 6;
  }

  // Experience level synergy bonus (up to 5 points)
  score += 5;

  return Math.min(Math.max(score, 10), 99);
}

/**
 * Returns reciprocal matching items between user and peer
 */
export function getReciprocalDetails(user, peer) {
  const userTeaches = user.skillsOffered?.find(sU => 
    peer.skillsWanted?.some(sP => 
      sU.name.toLowerCase().includes(sP.name.toLowerCase()) ||
      sP.name.toLowerCase().includes(sU.name.toLowerCase())
    )
  ) || user.skillsOffered?.[0];

  const peerTeaches = peer.skillsOffered?.find(sP => 
    user.skillsWanted?.some(sU => 
      sP.name.toLowerCase().includes(sU.name.toLowerCase()) ||
      sU.name.toLowerCase().includes(sP.name.toLowerCase())
    )
  ) || peer.skillsOffered?.[0];

  return {
    youTeach: userTeaches?.name || "React.js",
    peerTeaches: peerTeaches?.name || "UI/UX Design"
  };
}


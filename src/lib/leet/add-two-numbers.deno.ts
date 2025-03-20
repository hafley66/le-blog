// deno-lint-ignore-file
import { networkInterfaces } from "node:os";

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

const toLink = (first: Array<number>) => {
  let z: null | ListNode = null;
  let X: null | ListNode = null;
  for (let i = 0; i < first.length; i++) {
    if (!z) {
      z = new ListNode(first[i], null);
      X = z;
    } else {
      z.next = new ListNode(first[i], null);
      z = z.next;
    }
  }
  return X;
};

const toArray = (first: ListNode) => {
  let it = first;
  let collect = [];
  while (it) {
    collect.push(it.val);
    it = it.next;
  }
  return collect;
};

function addTwoNumbers(
  l1: ListNode | null,
  l2: ListNode | null,
): ListNode | null {
  let carry = 0;
  let index = 0;
  let x: ListNode | null = l1;
  let y: ListNode | null = l2;
  let z: ListNode | null = null;
  let head: ListNode | null = null;
  while (x || y) {
    let place = 10 ** index; // will equal 1 on zero index, ones place.
    let xx = (x?.val ?? 0) * place;
    let yy = (y?.val ?? 0) * place;

    let out = xx + yy + carry;
    let mod = out % place;
    let div = out / place;
    carry = div >= 10 ? place * 10 : 0;
    let val = div % 10;
    let next = { next: null, val };
    console.log({ index, xx, yy, place, out, mod, div, next, carry });
    if (z) {
      z.next = next;
      z = z.next;
    } else {
      head = next;
      z = next;
    }
    x = x?.next ?? null;
    y = y?.next ?? null;
    index++;
  }
  if (z && carry) {
    z.next = { val: 1, next: null };
  }
  return head;
}
const ex1 = [2, 4, 3];

// console.log(toArray(toLink(ex1)!), toLink(ex1));
// console.log(addTwoNumbers(toLink([3, 4, 2]), toLink([5, 6, 4])));
// console.log(
//   toArray(addTwoNumbers(toLink([9, 9, 9, 9, 9, 9, 9]), toLink([9, 9, 9, 9]))),
// );
export default {};

function lengthOfLongestSubstring(s: string): number {
  // maybe its a window. lets try greedy window
  let L = 0;
  let R = 0;
  let map = new Set();
  let res = 1;

  while (R < s.length) {
    let l = s[L], r = s[R];
    if (L === R) {
      map.add(l);
      R++;
      continue;
    }

    if (map.has(r)) { // invariant? left must always equal the repeated element in this case
      // no iwas wrong, we need to push L past the repeat or till R;
      do {
        map.delete(s[L]);
        L++;
      } while (s[L] !== r);
      continue;
    }
    map.add(r);
    R++;
    res = Math.max(res, map.size);
  }
  return res;
}

// console.log(lengthOfLongestSubstring("pwwkew"));

function longestPalindrome(s: string): string {
  // biome-ignore lint/style/useSingleVarDeclarator: <explanation>
  let L = 0, R = s.length;
  let takeFromLeft = true;
  let at = (i) => s[i];
  while (!isPalindrome(s.slice(L, R))) {
    console.log("Derp", s, L, R);
    if (takeFromLeft) {
      L++;
      takeFromLeft = false;
    } else {
      R--;
      takeFromLeft = true;
    }
  }
  return s.slice(L, R);
}

function isPalindrome(s: string) {
  // biome-ignore lint/style/useSingleVarDeclarator: <explanation>
  let a = 0, b = s.length - 1;
  while (a <= b) {
    console.log({ a, b, aa: s[a], bb: s[b] });
    if (s[a] !== s[b]) return false;
    a++;
    b--;
  }
  return true;
}

console.log(longestPalindrome("babad"));

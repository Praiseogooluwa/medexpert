/**
 * Compatibility shim so pages written against `react-router-dom`
 * keep working under TanStack Router. Maps Link / useNavigate / useLocation
 * to their TanStack equivalents using untyped string paths.
 */
import { forwardRef, type AnchorHTMLAttributes, type ReactNode } from "react";
import {
  Link as TLink,
  useNavigate as useTNavigate,
  useLocation as useTLocation,
  useRouter,
} from "@tanstack/react-router";

type LinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  to: string;
  state?: unknown;
  children?: ReactNode;
};

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { to, state, children, ...rest },
  ref,
) {
  // Cast to bypass TanStack's literal-path typing.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const TL = TLink as any;
  return (
    <TL ref={ref} to={to} state={state} {...rest}>
      {children}
    </TL>
  );
});

type NavigateOptions = { state?: unknown; replace?: boolean };

export function useNavigate() {
  const navigate = useTNavigate();
  const router = useRouter();
  return (to: string | number, opts?: NavigateOptions) => {
    if (typeof to === "number") {
      // history.go(-1) style
      if (typeof window !== "undefined") window.history.go(to);
      else router.history.go(to);
      return;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    navigate({ to: to as any, state: opts?.state as any, replace: opts?.replace });
  };
}

export function useLocation() {
  const loc = useTLocation();
  return {
    pathname: loc.pathname,
    search: loc.searchStr,
    hash: loc.hash,
    state: loc.state as unknown,
  };
}

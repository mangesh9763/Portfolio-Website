import { Component, ErrorInfo, ReactNode } from "react";

type Props = {
  children: ReactNode;
  fallback?: ReactNode;
};

type State = {
  hasError: boolean;
};

class ErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false,
  };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Portfolio error boundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div role="alert" style={{ padding: "2rem", color: "#fff" }}>
            Something went wrong while loading this section. Please refresh the page.
          </div>
        )
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

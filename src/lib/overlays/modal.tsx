import { ConnectifyModalProps } from "./overlays.props";
import { modalStyles } from "./overlays.styles";
import { DOMRef } from "../types";
import { useDOMRef } from "../utils";
import { forwardRef } from "react";
import { Overlay, useModalOverlay } from "react-aria";
import { Underlay } from "./underlay";
import { Button, Card } from "../index";
import { ConnectifyXMarkIcon } from "../icons";

function Modal(props: ConnectifyModalProps, ref: DOMRef<HTMLDivElement>) {
  const { state, size = "md", backdrop = "opaque", children } = props;

  const domRef = useDOMRef(ref);
  const { modalProps, underlayProps } = useModalOverlay(props, state, domRef);
  const { wrapper, self, icon, card, dismiss } = modalStyles({ size });

  return (
    <Overlay>
      <Underlay {...underlayProps} backdrop={backdrop} className={wrapper()}>
        <div ref={domRef} {...modalProps} className={self()}>
          <Card className={card()}>
            {children}
            <Button
              aria-label="Dismiss"
              isIconOnly
              size="sm"
              variant="light"
              onPress={state.close}
              className={dismiss()}
            >
              <ConnectifyXMarkIcon />
            </Button>
          </Card>
        </div>
      </Underlay>
    </Overlay>
  );
}

const _Modal = forwardRef(Modal);
export { _Modal as Modal };

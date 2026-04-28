import React, { useEffect, useState, createContext, useContext } from 'react';
import { createPortal } from 'react-dom';
import './message.css';

type MessageType = 'info' | 'success' | 'warning' | 'error' | 'primary';

interface MessageOptions {
  message: string | React.ReactNode;
  type?: MessageType;
  duration?: number;
  showClose?: boolean;
  offset?: number;
  placement?: 'top' | 'bottom';
  grouping?: boolean;
  icon?: React.ReactNode;
  onClose?: () => void;
}

interface MessageInstance {
  close: () => void;
}

let seed = 1;
const instances: { id: string; close: () => void }[] = [];
let container: HTMLElement | null = null;

const getContainer = (): HTMLElement => {
  if (!container) {
    container = document.createElement('div');
    container.className = 'el-message-wrapper';
    document.body.appendChild(container);
  }
  return container;
};

const closeAll = (): void => {
  instances.forEach(i => i.close());
};

const MessageContext = createContext<{
  addInstance: (instance: { id: string; close: () => void }) => void;
  removeInstance: (id: string) => void;
} | null>(null);

function MessageItem({ 
  message, 
  type = 'info', 
  duration = 3000, 
  onClose,
  id 
}: MessageOptions & { id: string }) {
  const [visible, setVisible] = useState(true);
  const { addInstance, removeInstance } = useContext(MessageContext) || {};

  useEffect(() => {
    addInstance?.({ id, close: () => setVisible(false) });
    
    if (duration > 0) {
      const timer = setTimeout(() => {
        setVisible(false);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setVisible(false);
    onClose?.();
  };

  if (!visible) {
    return null;
  }

  return (
    <div className={`el-message el-message--${type} ${visible ? 'el-fade-in-linear' : 'el-fade-out-linear'}`}>
      {message}
    </div>
  );
}

function MessageProvider({ children }: { children: React.ReactNode }) {
  const [instancesList, setInstancesList] = useState<Array<MessageOptions & { id: string }>>([]);

  const addInstance = (instance: { id: string; close: () => void }) => {
    instances.push(instance);
  };

  const removeInstance = (id: string) => {
    setInstancesList(prev => prev.filter(item => item.id !== id));
  };

  return (
    <MessageContext.Provider value={{ addInstance, removeInstance }}>
      {children}
      {createPortal(
        <div className="el-message-wrapper">
          {instancesList.map(item => (
            <MessageItem key={item.id} {...item} />
          ))}
        </div>,
        getContainer()
      )}
    </MessageContext.Provider>
  );
}

const createMessage = (options: string | MessageOptions): MessageInstance => {
  if (typeof options === 'string') {
    options = { message: options };
  }

  const defaultOptions: Required<Omit<MessageOptions, 'message'>> = {
    duration: 3000,
    type: 'info',
    showClose: false,
    offset: 16,
    placement: 'top',
    grouping: false,
    onClose: () => {},
    icon: undefined,
  };

  const opts: MessageOptions = {
    ...defaultOptions,
    ...options,
  };

  const id = `message_${seed++}`;

  if (opts.grouping) {
    const existing = instances.find(i => i.message === opts.message);
    if (existing) {
      return existing;
    }
  }

  const close = () => {
    const index = instances.findIndex(i => i.id === id);
    if (index !== -1) {
      instances.splice(index, 1);
    }
    opts.onClose?.();
  };

  instances.push({ id, close });

  return { close };
};

interface MessageFn {
  (options: string | MessageOptions): MessageInstance;
  info: (msg: string | React.ReactNode, options?: MessageOptions) => MessageInstance;
  success: (msg: string | React.ReactNode, options?: MessageOptions) => MessageInstance;
  warning: (msg: string | React.ReactNode, options?: MessageOptions) => MessageInstance;
  error: (msg: string | React.ReactNode, options?: MessageOptions) => MessageInstance;
  primary: (msg: string | React.ReactNode, options?: MessageOptions) => MessageInstance;
  closeAll: () => void;
}

const message = ((options: string | MessageOptions) => {
  return createMessage(options);
}) as MessageFn;

(['info', 'success', 'warning', 'error', 'primary'] as MessageType[]).forEach(type => {
  message[type] = (msg, options = { message: '' }) =>
    createMessage({
      ...options,
      message: msg,
      type,
    });
});

message.closeAll = closeAll;

export default message;
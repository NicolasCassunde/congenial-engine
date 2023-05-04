import { ClipboardText } from "phosphor-react";
import { ITask } from "./List";
import styles from "./ListContent.module.css";
import ListItem from "./ListItem";

export interface IListContentProps {
  tasks: ITask[];
  onDelete: (taskId: string) => void;
  onSelect: (taskId: string) => void;
}

export default function ListContent({
  tasks,
  onDelete,
  onSelect,
}: IListContentProps) {
  const createdTasksCount = tasks.length;
  const doneTasksCount = tasks.filter(
    (task: ITask) => task.isDone === true
  ).length;

  function onDeleteTaskProps(taskId: string) {
    onDelete(taskId);
  }

  function onSelectTaskProps(taskId: string) {
    onSelect(taskId);
  }

  return (
    <div className={styles.listContent}>
      <header className={styles.listContentHeader}>
        <div className={styles.listCreatedTaskCounter}>
        Tarefas criadas
          <span>{createdTasksCount}</span>
        </div>
        <div className={styles.listDoneTaskCounter}>
        Concluídas
          <span>
            {doneTasksCount} de {createdTasksCount}
          </span>
        </div>
      </header>
      {tasks.length === 0 ? (
        <div className={styles.emptyList}>
          <ClipboardText size={72}></ClipboardText>
          <strong>Você ainda não tem tarefas cadastradas</strong>
          <p>Crie tarefas e organize seus itens a fazer</p>
        </div>
      ) : (
        <main className={styles.listItensContainer}>
          {tasks.map(({ content, id, isDone }: ITask) => (
            <ListItem
              onDelete={onDeleteTaskProps}
              onSelect={onSelectTaskProps}
              key={`${id}-${content}`}
              taskId={id}
              content={content}
              isDone={isDone}
            ></ListItem>
          ))}
        </main>
      )}
    </div>
  );
}

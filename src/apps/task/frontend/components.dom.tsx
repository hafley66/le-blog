import _ from "lodash"
import {
  withClass,
  withId,
} from "~/lib/form_helpers/with.dom"

export const MOUNT = "app-tasks-board"
export const Board = withId("div", "task-board")
export const BoardHeader = withId(
  "div",
  "task-board-header",
)
export const Lane = withClass("details", "task-lane")
export const TaskDiv = withClass("div", "task")
export const AddFormDetails = withId(
  "dialog",
  "add-task-details",
)
export const EditFormDetails = withId(
  "dialog",
  "edit-task-details",
)
export const EditForm = withId("form", "edit-task")
export const AddActions = withId("div", "task-add-actions")

export const STATUS = {
  0: "planning",
  1: "ready",
  2: "active",
  3: "done",
  4: "published",
}

export const css = String.raw`
<style>
  #${MOUNT} {
    width: 100%;
  }

  ${Board.selector} {
    &.dragging ${Lane.selector} {
      height: unset;
    }
    overflow: auto;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(5, minmax(300px, 1fr));
    column-gap: 16px;
    row-gap: 4px;
    background-color: var(--color-slate-950);
    border: 4px solid var(--color-sky-500);
    border-radius: 10px;
    padding: 8px 16px;
    
    
    ${BoardHeader.selector} {
      grid-column: span 5;
      display: flex;
      gap: 12px;
      /* justify-content: space-between; */
    }


    ${Lane.selector} {

      resize: both;
      /* padding: 16px; */
      background-color: var(--color-slate-500);
      border-radius: 6px;
      height: fit-content;

      min-height: 100px;
      min-width: 200px;

      summary {
        cursor: pointer;
        padding: 8px 8px;
        margin: 0px;
        white-space: pre;
        background-color: var(--color-rose-900);
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
      }
    }

    ${TaskDiv.selector} {
      cursor: pointer;
      background-color: var(--color-rose-950);
      padding: 8px 6px 6px 6px;
      margin: 10px;
      border-radius: 4px;
      word-break: break-word;
      font-size: 14px;
      &:hover {
        background-image: linear-gradient(rgb(0 0 0/12%) 0 0);
      }
    }

    dialog:has(form) {
      padding: 0px;
      margin: auto;
      overflow: visible;
      max-width: 600px;
      width: 90vw;
      &:open {
        display: block;
      }

      header h3 {
        font-size: 20px;
        font-family: sans-serif;
        margin: 0px;
        padding: 0px;
        padding: 16px 16px 0px 16px;
      }

      form {
        margin: 0px;
        padding: 0px;
      }

      form > div {
        display: grid;
        grid-template-columns: auto 1fr;
        padding: 16px;
        border: 1px solid var(--color-border);
        gap: 8px;
      }

      ${AddActions.selector} {
        display: grid;
        grid-template-columns: 1fr 1fr;
        height: 40px;
        overflow: visible;
        button {
          width: 100%;
          display: block;
          border: none;
          height: 40px;
          border-radius: 0px;
          cursor: not-allowed;

          &:not(:disabled) { 
            cursor: pointer;
            &:hover:active {
            background-image: linear-gradient(rgb(0 0 0/40%) 0 0);
            }

            &:hover {
              background-image: linear-gradient(rgb(0 0 0/12%) 0 0);
            }
          }
          &:disabled {
            opacity: 50%;
          }

          &[name="cancel"] {
            background-color: var(--color-red-400);
          }

          &[type="submit"] {
            background-color: var(--color-blue-400);
          }

          &[name="add-more"] {
            background-color: var(--color-sky-400);
            grid-column: 2;
          }
        }
      }
    }
  }
  [popover]::backdrop {
    background: rgba(0,0,0,0.12);
  }
</style>
`

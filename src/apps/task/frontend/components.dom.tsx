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
    overflow: auto;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(5, minmax(150px, 1fr));
    gap: 16px;
    background: var(--color-inferno-21);
    border-radius: 4px;
    padding: 8px 16px;
    
    
    ${BoardHeader.selector} {
      grid-column: span 5;
      display: flex;
      justify-content: space-between;
    }


    ${Lane.selector} {

      resize: both;
      /* padding: 16px; */
      background: var(--color-inferno-7);
      border-radius: 2px;

      height: fit-content;

      summary {
        cursor: pointer;
        padding: 32px 8px;
        margin: 0px;
        white-space: pre;
      }
    }

    ${TaskDiv.selector} {
      cursor: pointer;
      background: var(--color-inferno-1);
      padding: 4px 4px;
      margin: 4px;
      word-break: break-word;
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

  [popover]::backdrop {
    background: rgba(0,0,0,0.12);
  }
</style>
`

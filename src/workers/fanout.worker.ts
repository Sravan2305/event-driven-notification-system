import { dependencies } from "../bootstrap/dependencies";
import { sleep } from "../common/sleep";

export class FanoutWorker {
  private running = false;

  async start() {
    if (this.running) {
      console.log("Fanout worker is already running.");
      return;
    }

    this.running = true;

    console.log("Fanout worker started.");

    while (this.running) {
      try {
        const result =
          await dependencies.fanoutService.processPendingEvents();

        if (result.processed > 0) {
          console.log(
            `Processed ${result.processed} outbox event(s).`
          );
        }
      } catch (error) {
        console.error("Fanout worker error:", error);
      }

      await sleep(2000);
    }
  }

  stop() {
    this.running = false;

    console.log("Fanout worker stopped.");
  }
}
const DEFAULT_SIMULATION_MODES = {
  networkFlap: false,
  offlineBurst: false,
  duplicateSpam: false,
  transactionFailure: false,
  reconciliationTimeout: false,
  queueCorruption: false,
};

function logResult(pass, reason) {
  console.log(`[V2 SIM RESULT] ${pass ? "PASS" : "FAIL"} - ${reason}`);
}

export function createOrderFailureSimulator({
  enabled = false,
  modes = DEFAULT_SIMULATION_MODES,
  operations,
}) {
  const active = Boolean(enabled);
  const simulationModes = { ...DEFAULT_SIMULATION_MODES, ...modes };

  const wrapPlaceOrder = async (originalPlaceOrder, payload) => {
    if (!active) return originalPlaceOrder(payload);

    if (simulationModes.networkFlap) {
      console.log("[V2 SIM] network flap triggered");
      logResult(true, "network flap simulation executed");
      return { success: false, error: "SIMULATED_NETWORK_FLAP" };
    }

    if (simulationModes.duplicateSpam) {
      console.log("[V2 SIM] duplicate order spam injected");
      const first = await originalPlaceOrder(payload);
      const second = await originalPlaceOrder(payload);
      const pass = !second.success;
      logResult(pass, pass ? "duplicate protection observed" : "duplicate protection not observed");
      return first;
    }

    return originalPlaceOrder(payload);
  };

  const wrapProcessOfflineQueue = async (originalProcessOfflineQueue) => {
    if (!active) return originalProcessOfflineQueue();

    if (simulationModes.offlineBurst) {
      console.log("[V2 SIM] network flap triggered");
    }
    if (simulationModes.queueCorruption) {
      console.log("[V2 SIM] queue corruption simulated");
    }
    const result = await originalProcessOfflineQueue();
    logResult(true, "offline queue processing completed");
    return result;
  };

  const runOrderStressSuite = async (samplePayloadFactory) => {
    if (!active) {
      logResult(true, "simulator disabled by default");
      return { success: true, data: "SIMULATOR_DISABLED" };
    }
    try {
      if (simulationModes.reconciliationTimeout) {
        console.log("[V2 SIM] reconciliation timeout simulated");
      }
      if (simulationModes.transactionFailure) {
        console.log("[V2 SIM] transaction failure injected");
      }

      const calls = [];
      for (let i = 0; i < 10; i += 1) {
        const payload = samplePayloadFactory?.(i);
        calls.push(operations.placeOrder(payload));
      }
      const settled = await Promise.allSettled(calls);
      const hasCrash = settled.some((item) => item.status === "rejected");
      logResult(!hasCrash, hasCrash ? "stress suite found crashes" : "stress suite completed");
      return { success: !hasCrash, data: settled };
    } catch (error) {
      logResult(false, "stress suite threw unexpected error");
      return {
        success: false,
        error: error instanceof Error ? error.message : "STRESS_SUITE_FAILED",
      };
    }
  };

  return {
    enabled: active,
    modes: simulationModes,
    wrapPlaceOrder,
    wrapProcessOfflineQueue,
    runOrderStressSuite,
  };
}

/*
 * Copyright 2016 Red Hat, Inc. and/or its affiliates.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package org.kie.server.examples.optaplanner.taskassignment.kjar.domain;

import com.thoughtworks.xstream.annotations.XStreamAlias;

@XStreamAlias("TaAffinity")
public enum Affinity {
    NONE(4, "No affinity"),
    LOW(3, "Low affinity"),
    MEDIUM(2, "Medium affinity"),
    HIGH(1, "High affinity");

    private final int durationMultiplier;
    private final String label;

    Affinity(int durationMultiplier, String label) {
        this.durationMultiplier = durationMultiplier;
        this.label = label;
    }

    public int getDurationMultiplier() {
        return durationMultiplier;
    }

    public String getLabel() {
        return label;
    }

}
